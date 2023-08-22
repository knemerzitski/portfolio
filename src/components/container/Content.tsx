import { ComponentPropsWithRef, ElementType } from 'react';
import classNames from 'classnames';

type ContentProps<C extends ElementType> = {
  as?: C,
} & ComponentPropsWithRef<C>

export default function Content<C extends ElementType = 'div'>({
  as = 'div',
  children,
  className = '',
  ...restProps
}: ContentProps<C>) {
  const Component = as;

  return (
    <Component className={classNames(
      'md:max-w-screen-lg mx-auto px-2 md:px-4',
      className
    )}  {...restProps}>
      {children}
    </Component>
  );
}