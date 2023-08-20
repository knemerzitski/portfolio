// Load component only when visible on screen
"use client";

import { ComponentPropsWithRef, ElementType, ReactNode, useRef } from 'react'
import useHasIntersected from '@/hooks/useHasIntersected';

type Props<C extends ElementType> = {
  as?: C,
  fallback?: ReactNode,
  rootMargin?: string,
} & ComponentPropsWithRef<C>


export default function IntersectionSuspense<C extends ElementType = 'div'>({
  as = 'div',
  rootMargin,
  fallback,
  children,
  ...restProps
}: Props<C>) {
  const containerRef = useRef(null);
  const hasIntersected = useHasIntersected(containerRef, {
    rootMargin,
  });

  const canRender = hasIntersected;

  const Component = as;
  return (
    <Component ref={containerRef} {...restProps}>
      {canRender ? children : fallback}
    </Component>
  )
}