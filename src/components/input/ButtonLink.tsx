import { ButtonHTMLAttributes } from "react";
import classNames from 'classnames';

export default function ButtonLink({ children, className = '', ...restProps }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={classNames(
      'font-medium text-secondary-400 hover:text-secondary-500',
      className
    )} {...restProps}>
      {children}
    </button>
  );
}