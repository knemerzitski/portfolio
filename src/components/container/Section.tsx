import { ComponentPropsWithRef, ElementType } from 'react';
import classNames from 'classnames';

type SectionProps<C extends ElementType> = {
  as?: C,
} & ComponentPropsWithRef<C>

export default function Section<C extends ElementType = 'section'>({
  as = 'section',
  children,
  className = '',
  id,
  ...restProps
}: SectionProps<C>) {
  const Component = as;

  return (
    <Component className={classNames('mb-32 pt-16 md:mb-20 md:pt-28', className)} id={id} {...restProps}>
      {children}
    </Component>
  );
}
