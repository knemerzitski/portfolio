import { HTMLAttributes } from 'react';
import classNames from 'classnames';


export default function Tag({ children, className = '', ...restProps }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={classNames(
      'bg-secondary-900/40',
      'text-secondary-500',
      'font-medium',
      'text-sm',
      'px-3 py-1',
      'rounded-full',
      className
    )} {...restProps}>
      {children}
    </div>
  );
}