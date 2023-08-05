import { ButtonHTMLAttributes } from 'react';

const baseClassNames = `
  text-lg
  px-5 xs:px-7 
  py-3 xs:py-4
  
  rounded-sm
  shadow-dp4 shadow-shadow/40

  hover:brightness-110
  hover:shadow-btn-hover

  focus:outline-0
  focus-visible:outline
  focus-visible:outline-1

  active:translate-y-[1px]
  active:outline-none

  disabled:brightness-[70%]
  disabled:cursor-not-allowed
  disabled:shadow-none
`;

export default function Button({ children, className = '', ...restProps }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`
      ${baseClassNames}
      bg-secondary-700
      text-text
      focus-visible:outline-secondary-500
      ${className}
    `}
      {...restProps}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, className = '', ...restProps }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`
      ${baseClassNames}
      bg-primary-400
      text-text/80
      focus-visible:outline-text/30
      ${className}
    `}
      {...restProps}
    >
      {children}
    </button>
  );
}