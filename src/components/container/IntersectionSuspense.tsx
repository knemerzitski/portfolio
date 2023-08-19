// Load component only when visible on screen
"use client";

import { ComponentPropsWithRef, ElementType, useRef } from 'react'
import useIntersectionObserver from '@react-hook/intersection-observer'

type Props<C extends ElementType> = {
  as?: C,
} & ComponentPropsWithRef<C>


export default function IntersectionSuspense<C extends ElementType = 'div'>({
  as = 'div',
  children,
  ...restProps
}: Props<C>) {
  const containerRef = useRef(null);
  const hasIntersectedRef = useRef(false);
  const { isIntersecting } = useIntersectionObserver(containerRef)
  if (!hasIntersectedRef.current && isIntersecting) {
    hasIntersectedRef.current = true;
  }

  const Component = as;
  return (
    <Component ref={containerRef} {...restProps}>
      {hasIntersectedRef.current && children}
    </Component>
  )
}