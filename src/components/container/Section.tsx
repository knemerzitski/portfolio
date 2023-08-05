import { ComponentPropsWithRef, ElementType } from 'react';

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
    <Component className={`mb-20 pt-28 ${className}`} id={id} {...restProps}>
      {children}
    </Component>
  );
}
