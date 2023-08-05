"use client";

import { HTMLAttributes } from 'react';
import Surface from '@/components/container/Surface';

export default function Card({children, className, ...restProps}:  & HTMLAttributes<HTMLDivElement>) {
  return (
    <Surface className={`
      rounded
      p-5 py-8 lg:p-10
      h-max
      shadow-dp6 shadow-shadow/50
      ${className}
    `} {...restProps}>{children}</Surface>
  );
}