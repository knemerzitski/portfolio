import { InputHTMLAttributes, TextareaHTMLAttributes, ComponentPropsWithRef, ElementType, FC, useRef } from "react";
import { useSurfaceColor } from "@/components/container/Surface";

export function Input(props: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <BaseInput as="input" {...props} />
  );
}

export function TextArea(props: InputProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <BaseInput as="textarea" {...props} />
  );
}

type AsProps<C extends ElementType> = {
  as: typeof HTMLInputElement | typeof HTMLTextAreaElement
} & ComponentPropsWithRef<C>;

type InputProps = {
  className?: string,
  focus?: boolean,
  label: string,
  message: string,
  isActivated: boolean,
}

function BaseInput<C extends ElementType>({
  as,
  children,
  className = '',
  label,
  message = '',
  focus = false,
  isActivated = false,
  ...restProps
}: InputProps & AsProps<C>) {
  const Component = as;

  const isInvalid = Boolean(message);

  function handleRef(inputRef: HTMLOrSVGElement & Element) {
    if (inputRef == null) return;
    if (focus) {
      inputRef.scrollIntoView();
      inputRef.focus();
    }
  }

  const surfaceColor = useSurfaceColor();

  return (
    <div className="relative">
      <Component ref={handleRef} className={`
        block
        w-full
        p-3 rounded 

        bg-transparent

        outline
        outline-1
        ${isInvalid ?
          'outline-2 outline-danger-500'
          :
          (isActivated ?
            'outline-secondary-800 focus:outline-secondary-600'
            :
            'outline-primary-300 focus:outline-primary-50'
          )
        }

        disabled:brightness-[70%]
        disabled:cursor-not-allowed

        autofill:shadow-inner-full
        autofill:shadow-primary-700
        autofill:text-fill-color
      ${className}
    `}

        {...restProps}>
      </Component>

      <div className={`absolute bg-${surfaceColor} text-sm text-text/80 select-none leading-none -top-[1ch] left-2 px-1`}>
        {label}
      </div>

      <div className={`mt-1 text-sm ${isInvalid && 'text-danger-500'}`}>
        <span>{isInvalid ? message : '\u00A0'}</span>
      </div>
    </div>
  );
}