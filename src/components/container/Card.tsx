"use client";

import { HTMLAttributes } from 'react';
import Surface from '@/components/container/Surface';
import classNames from 'classnames';

export default function Card({ children, className = '', ...restProps }: HTMLAttributes<HTMLDivElement>) {
  return (
    <Surface className={classNames(
      'rounded',
      'p-5 py-8 lg:p-10',
      'shadow-dp6 shadow-shadow/50',
      className
    )} {...restProps}>{children}</Surface>
  );
}