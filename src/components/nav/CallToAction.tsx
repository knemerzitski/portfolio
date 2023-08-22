import { AnchorHTMLAttributes } from "react";
import Anchor from "@/components/nav/Anchor";
import { LinkProps } from "next/link";
import classNames from 'classnames';

export default function CallToActionButton({
  children,
  className = '',
  ...restProps
}:
  AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps
) {
  return (
    <Anchor className={classNames(
      'text-text',
      'px-5 py-3',
      'bg-secondary-700',
      'rounded-sm',
      'shadow-dp4 shadow-shadow/40',
      'hover:brightness-110',
      'hover:shadow-btn-hover',
      'active:outline-none',
      'focus:outline-0',
      'focus-visible:outline',
      'focus-visible:outline-1',
      'focus-visible:outline-secondary-500',
      className
    )} {...restProps}>
      {children}
      <span className="ml-1">-&gt;</span>
    </Anchor>
  );
}