import { ButtonHTMLAttributes } from "react";

export default function ButtonLink({ children, className = '', ...restProps }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={
      `font-medium text-secondary-400 hover:text-secondary-500 ${className}
    `} {...restProps}>
      {children}
    </button>
  );
}