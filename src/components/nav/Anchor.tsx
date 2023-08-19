"use client";

import { useHashContext } from "@/contexts/HashContext";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnchorHTMLAttributes, MouseEvent } from "react";

const reduceMotionQuery = typeof window !== 'undefined' ? window.matchMedia("(prefers-reduced-motion: reduce)") : null;
const canScrollIntoView = typeof document !== 'undefined' && typeof document.body.scrollIntoView === 'function';

export default function Anchor({ children, href, ...restProps }: AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const hashContext = useHashContext();

  function handleOnClick(e: MouseEvent<HTMLAnchorElement>) {
    if ((href.startsWith('/') && !href.startsWith(pathname)) || !href.includes('#')) return;
    e.preventDefault();

    const id = href.replace(/.*\#/, '');
    const hash = `#${id}`;

    // Update next.js router
    router.push(hash, { scroll: false });
    // Update HashContext
    hashContext?.push(hash);

    // Scroll into view manually
    const el = document.getElementById(id);
    if (!el) return;

    const scrollBehavior = !reduceMotionQuery || !reduceMotionQuery.matches ? 'smooth' : 'auto';

    if (canScrollIntoView) {
      el.scrollIntoView({ behavior: scrollBehavior });
    } else {
      window.scrollTo({
        top: el.getBoundingClientRect().top,
        behavior: scrollBehavior,
      });
    }
  }

  return (
    <Link href={href} {...restProps} onClick={handleOnClick}>
      {children}
    </Link>
  );
}