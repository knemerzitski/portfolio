// Load component only when visible on screen
"use client";

import { ComponentPropsWithRef, ElementType, useEffect, useRef, useState } from 'react'
import useHasIntersected from '@/hooks/useHasIntersected';

type Props<C extends ElementType> = {
  as?: C,
  rootMargin?: string,
} & ComponentPropsWithRef<C>


export default function IntersectionSuspense<C extends ElementType = 'div'>({
  as = 'div',
  rootMargin,
  children,
  ...restProps
}: Props<C>) {
  const [isJsDisabled, setIsJsDisabled] = useState(true);
  const containerRef = useRef(null);
  const hasIntersected = useHasIntersected(containerRef, {
    rootMargin,
  });

  useEffect(() => {
    setIsJsDisabled(false);
  }, []);

  const canRender = isJsDisabled || hasIntersected;

  const Component = as;
  return (
    <Component ref={containerRef} {...restProps}>
      {canRender && children}
    </Component>
  )
}