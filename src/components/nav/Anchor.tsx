import Link, { LinkProps } from "next/link";
import { AnchorHTMLAttributes } from "react";

// Not using next/link when href has hash due to it not triggering 'hashchange' event
export default function Anchor({ children, href, ...restProps }: AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps) {
  const hrefWithHash = href.includes('#');
  return hrefWithHash ? (
    <a href={href} {...restProps}>
      {children}
    </a>
  ) : (
    <Link href={href} {...restProps}>
      {children}
    </Link>
  );
}