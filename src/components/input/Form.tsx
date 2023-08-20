import Button from '@/components/input/Button';
import { FormEvent, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Input, TextArea } from './Input';
import { ValidationInputErrors, parseSchema, validate, validateOne } from '@/libs/validation';
import { FormSchema, InputSchema } from '@/libs/form';
import isPlainObject from 'lodash/isPlainObject';
import {
  isEnabled as isGrecaptchaEnabled,
  getToken as getGrecaptchaToken,
  ApiScript as GrecaptchaScript,
  apiScriptLoadedPromise as grecaptchaScriptLoadedPromise,
  BrandingVisiblity as GrecaptchaBrandingVisibility
} from '@/libs/grecaptcha';
import { useCookieConsentContext } from '@/contexts/CookieConsentContext';
import dynamic from 'next/dynamic';

const Loader = dynamic(() => import('@/components/info/Loader'));

interface FormProps {
  action: string, // Used for Grecaptcha action
  schema: FormSchema,
  apiPath: string,
  onSuccess?: () => string, // Message shown on forum successful submit
  onError?: (code: string, error?: any) => ReactNode, // Handle any custom error
  disabled?: boolean,
}

export interface FormValues {
  [key: string]: string,
}

interface ResponseMessage {
  value: ReactNode,
  isError: boolean,
}

const DEFAULT_STATUS_MESSAGE: ResponseMessage = {
  value: '',
  isError: false
};



export default function Form({
  action,
  schema,
  apiPath,
  onSuccess = () => 'Thank you! Form submitted successfully!',
  onError = () => '',
  disabled = false,
}: FormProps) {
  const formValidator = useMemo(() => {
    return parseSchema(schema);
  }, [schema]);

  const defaultFormValues = useMemo(() => {
    return Object.keys(schema).reduce((vals, key) => ({
      ...vals,
      [key]: ''
    }), {});
  }, [schema]);

  const [formValues, setFormValues] = useState<FormValues>(defaultFormValues);
  const [activatedInputs, setActivatedInputs] = useState({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<ResponseMessage>(DEFAULT_STATUS_MESSAGE);
  const [inputValidationErrors, setInputValidationErrors] = useState<ValidationInputErrors>({});

  const cookieConsentContext = useCookieConsentContext();
  const [hasSpamProtectionConsent, setHasSpamProtectionConsent] = useState(false);

  const focusedNameRef = useRef<string | null>(null);

  // Using useEffect to set 'hasSpamProtectionConsent' as otherwise it might be different during hydration
  useEffect(() => {
    setHasSpamProtectionConsent(cookieConsentContext?.getConsent()?.spam ?? false);
    setStatusMessage(DEFAULT_STATUS_MESSAGE);
  }, [cookieConsentContext]);

  useEffect(() => {
    function preventLeavingWhileSubmitting(e: BeforeUnloadEvent) {
      if (isSubmitting) {
        e.returnValue = true;
      }
    }

    window.addEventListener('beforeunload', preventLeavingWhileSubmitting);
    return () => window.removeEventListener('beforeunload', preventLeavingWhileSubmitting);
  });

  const isFormDisabled = disabled || isSubmitting;

  function handleInputChanged(name: string, value: string) {
    setFormValues({ ...formValues, [name]: value });
    setActivatedInputs({ ...activatedInputs, [name]: true });
    setStatusMessage(DEFAULT_STATUS_MESSAGE);
  }

  function handleValidationError(validationError: any) {
    if (typeof validationError === 'string') {
      setStatusMessage({
        isError: true,
        value: validationError,
      });
      return;
    }

    if (isPlainObject(validationError)) {
      const keys = Object.keys(validationError);
      const hasKeys = keys.length > 0;
      const allValuesString = Object.values(validationError).every(val => typeof val === 'string');
      if (hasKeys && allValuesString) {
        const inputNames = Object.keys(formValues);
        const extraInputKeys = keys.filter(x => !inputNames.includes(x));
        if (extraInputKeys.length > 0) {
          setStatusMessage({
            isError: true,
            value: `Oops! Missing form fields with name: ${extraInputKeys.join(', ')}`,
          });
        }
        setInputValidationErrors(validationError);
        
        focusedNameRef.current = Object.keys(validationError).find(key => validationError[key]) ?? null;

        return;
      }
    }

    setStatusMessage({
      isError: true,
      value: 'Oops! Unknown validation error!',
    });
  }


  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    // Extra client side form validation after builtin browser validation
    const clientValidationErrors = validate(formValues, formValidator);
    if (clientValidationErrors) {
      handleValidationError(clientValidationErrors);
      return;
    }

    try {
      setIsSubmitting(true);
      setStatusMessage(DEFAULT_STATUS_MESSAGE);
      setInputValidationErrors({});

      const payload: {
        token?: string | undefined
        form: FormValues
      } = {
        form: formValues,
      };

      let res: Response | undefined;
      try {
        if (isGrecaptchaEnabled()) {
          await grecaptchaScriptLoadedPromise(); // Wait for grecaptcha script to be loaded

          // Prepare spam verification token
          const token = await getGrecaptchaToken(action);
          if (!token) {
            const customErrorMessage = onError('no-recaptcha-token');
            setStatusMessage({
              isError: true,
              value: customErrorMessage ?? `Submit cancelled`,
            });
            return;
          }
          payload.token = token;
        }

        console.log('form', `Sent form request to ${apiPath} with payload`, payload);
        res = await fetch(apiPath, {
          body: JSON.stringify(payload),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
      } catch (err) {
        if (!window.navigator.onLine) {
          setStatusMessage({
            isError: true,
            value: 'You appear to be offline. Please check your internet connection.',
          });
          return;
        } else {
          throw err;
        }
      }

      // Validate http 200-299 response
      if (!res.ok) {
        console.log('form', 'Not ok', res.status, res.statusText);
        const customErrorMessage = onError('res-not-ok', res.status);
        console.log('form', customErrorMessage, customErrorMessage ?? `${res.status} ${res.statusText}`);
        setStatusMessage({
          isError: true,
          value: customErrorMessage ?? `${res.status} ${res.statusText}`,
        });
        return;
      }

      // Validate body actual json structure
      let resData: any = null;
      try {
        resData = await res.json();
      } catch (e: unknown) {
        if (e instanceof SyntaxError) {
          console.log('form', 'JSON', e);
          const customErrorMessage = onError('not-json');
          setStatusMessage({
            isError: true,
            value: customErrorMessage ?? `JSON syntax error`,
          });
          return;
        } else {
          throw e;
        }
      }
      console.log('form', 'Server responded', resData);

      // Success
      if (resData.success === true) {
        const successMessage = onSuccess();
        setStatusMessage({
          isError: false,
          value: successMessage,
        });
        resetForm();
        return;
      }

      // Form validation errors
      const code = typeof resData.code === 'string' ? resData.code : '';
      console.log('form', 'error code', code);
      if (code === 'validation-error') {
        handleValidationError(resData.error);
        return;
      }

      // Any other custom error
      const customErrorMessage = onError(code, resData.error);
      if (customErrorMessage) {
        setStatusMessage({
          isError: true,
          value: customErrorMessage,
        });
        return;
      }

      // Unhandled errors
      setStatusMessage({
        isError: true,
        value: 'Oops! Something went wrong. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetForm() {
    setFormValues(defaultFormValues);
    setActivatedInputs({});
  }

  function renderInput(name: string, input: InputSchema): ReactNode {
    const isActivated = name in activatedInputs;
    const value = formValues[name];
    const label = input.label + (input.attributes.required ? '*' : '');
    const placeholder = input.label;
    const focus = name === focusedNameRef.current;

    function handleOnFocus(){
      if(focus){
        // Focus only once
        focusedNameRef.current = null;
      }
    }

    let validationMessage = '';
    if (inputValidationErrors[name]) {
      validationMessage = inputValidationErrors[name];
    } else if (isActivated) {
      validationMessage = validateOne(value, formValidator[name]);
    }

    switch (input.type) {
      case 'text':
      case 'email':
        return (
          <Input
            label={label}
            name={name}
            type={input.type}
            value={value}
            onChange={(e) => handleInputChanged(name, e.target.value)}
            isActivated={isActivated}
            disabled={isFormDisabled}
            message={validationMessage}
            placeholder={placeholder}
            onFocus={handleOnFocus}
            focus={focus}
            {...input.attributes}
          />
        );
      case 'textarea':
        return (
          <TextArea
            label={label}
            name={name}
            value={value}
            onChange={(e) => handleInputChanged(name, e.target.value)}
            isActivated={isActivated}
            disabled={isFormDisabled}
            message={validationMessage}
            placeholder={placeholder}
            onFocus={handleOnFocus}
            focus={focus}
            {...input.attributes}
          />
        );
    }
  }

  return (
    <>
      {(hasSpamProtectionConsent || isSubmitting) && <GrecaptchaScript />}
      <form onSubmit={handleSubmit} className='grid grid-cols-12 md:gap-x-8 gap-y-6'>
        {Object.entries(schema).map(([name, input]) => (
          <div key={name} className={input.className}>
            {renderInput(name, input)}
          </div>
        ))}
        <div className='col-span-12 text-end mt-2 flex gap-8 justify-end items-center'>
          {statusMessage.value &&
            <div className={`text-base sm:text-lg ${!statusMessage.isError ? 'text-secondary-500' : 'text-danger-500'}`}>
              {statusMessage.value}
            </div>
          }

          <Button type='submit' disabled={isFormDisabled}>
            <div className="relative">
              <span className={`${isSubmitting ? 'invisible' : 'visible'}`}>
                Send
              </span>
              <div className={`
                absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                text-4xl
                ${isSubmitting ? '' : 'hidden'}
              `}>
                <Loader />
              </div>
            </div>

          </Button>

        </div>
      </form>
      <GrecaptchaBrandingVisibility className={`
        text-text text-xs opacity-80 pt-2 lg:pt-0 lg:absolute lg:translate-y-1
        `} />
    </>
  );
}