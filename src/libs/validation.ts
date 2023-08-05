import isPlainObject from "lodash/isPlainObject";

export interface ValidationSchema {
  [key: string]: ValidationInputSchema
}

export interface ValidationInputSchema {
  readonly type: 'text' | 'email' | 'textarea',
  readonly attributes: {
    readonly required?: boolean | undefined,
    readonly maxLength?: number | undefined,
  }
}

export interface ValidationInputErrors {
  [key: string]: string,
}

export type ValidationError = ValidationInputErrors | string;

interface Validator {
  [key: string]: ValidatorFunction[],
}

type ValidatorFunction = (value: any) => string;

export function parseSchema(schema: ValidationSchema): Validator {
  return Object.keys(schema).reduce((validators, key) => {
    const newValidator = [];

    const input = schema[key];

    // required
    if (input.attributes.required) {
      newValidator.push(validateRequired)
    }

    // email
    if (input.type === 'email') {
      if (input.attributes.required) {
        newValidator.push(validateEmail);
      } else {
        newValidator.push((s: string) => !validateRequired(s) && validateEmail(s));
      }
    }

    // maxLength
    if (typeof input.attributes.maxLength !== 'undefined') {
      const maxLength = input.attributes.maxLength;
      newValidator.push((s: string) => validateMaxLength(s, maxLength));
    }

    if (newValidator.length > 0) {
      return { ...validators, [key]: newValidator }
    } else {
      return validators;
    }
  }, {});
}

export function validate(raw: any, validator: Validator): ValidationError {
  // Not object or not all values are strings
  if(!isPlainObject(raw) || !Object.values(raw).every(val => typeof val === 'string')){
    return 'Invalid data';    
  }
  const rawStringObject = raw as {[key: string | number]: string};

  const validationErrors = Object.keys(validator).reduce((result, key) => {
    const message = validateOne(rawStringObject[key], validator[key]);
    if (message) {
      return { ...result, [key]: message };
    }
    return result;
  }, {});

  if (Object.keys(validationErrors).length > 0) {
    return validationErrors;;
  }

  return '';
}

export function validateOne(rawValue: string | undefined, validatorFuncs: ValidatorFunction[]): string {
  if (validatorFuncs) {
    for (const validatorFunc of validatorFuncs) {
      const message = validatorFunc(rawValue);
      if (message) {
        return message;
      }
    }
  }
  return '';
}

function validateRequired(value: string | undefined): string {
  if (value?.match(/\S/) == null) {
    return '*Required';
  }
  return '';
}

function validateMaxLength(value: string | undefined, maxLength: number): string {
  if (value && value.length > maxLength) {
    return `*Max length is ${maxLength}`;
  }
  return '';
}

function validateEmail(value: string | undefined): string {
  if (!value) {
    return `*Please enter a valid email address.`;
  }

  const emailMatch = value.match(/(\S*)@(\S*)/);
  if (!emailMatch) {
    return `*Please include an '@' in the email address.`;
  }

  if (emailMatch.length < 2) {
    // Validation should never reach here
    return `*Please enter a valid email address.`;
  }

  if (!emailMatch[1]) {
    return `*Please include a part followed by '@'.`;
  } else if (!emailMatch[2]) {
    return `*Please include a part following '@'.`;
  }

  return '';
}




