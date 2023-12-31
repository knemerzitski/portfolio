import { AnchorHTMLAttributes } from "react";
import Anchor from "@/components/nav/Anchor";
import { LinkProps } from "next/link";
import classNames from 'classnames';

// export default function TextLink({ children, className = '', href, ...restProps }: ComponentPropsWithoutRef<typeof Link>) {
export default function TextLink({ children, className = '', ...restProps }: AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps) {
  return (
    <Anchor className={classNames(
      'font-medium text-secondary-400 hover:text-secondary-500',
      className,
    )} {...restProps} >
      {children}
    </Anchor>
  );
}