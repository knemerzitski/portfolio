"use client";

import { MouseEventHandler, ReactNode, useEffect, useState } from "react";
import Anchor from "@/components/nav/Anchor";
import { usePathname } from "next/navigation";

export interface NavLink {
  href: string,
  id?: string,
  as?: string,
  innerNode: ReactNode,
}

function getHashValueFromHref(href: string): string | undefined {
  const hashIndex = href.indexOf('#');
  if (hashIndex !== -1) {
    return href.substring(hashIndex + 1);
  }
}

function getElementVisibleHeight(el: Element) {
  const screenHeight = window.screen.height;
  const rect = el.getBoundingClientRect();
  let visibleHeight = rect.height;
  if (rect.bottom < 0 || rect.top > screenHeight) {
    visibleHeight = 0;
  } else if (rect.bottom > screenHeight) {
    visibleHeight = screenHeight - rect.y;
  } else if (rect.top < 0) {
    visibleHeight = rect.height + rect.y;
  }
  return visibleHeight;
}


export default function NavItems({
  links,
  ulClassName,
  liClassName,
  aActiveClassName,
  aClassName,
  onNavLinkClick,
}: {
  links: NavLink[],
  ulClassName?: string,
  liClassName?: string,
  aActiveClassName?: string,
  aClassName?: string,
  onNavLinkClick?: MouseEventHandler<HTMLAnchorElement>
}) {
  const [focusedSectionId, setFocusedSectionId] = useState<string>();
  const pathname = usePathname();

  // Select focused section with most height visible on screen
  useEffect(() => {
    const sectionEls: Element[] = [];
    for (const { href, id } of links) {
      const elId = id ?? getHashValueFromHref(href);
      if (elId) {
        const el = document.getElementById(elId);
        if (el) {
          sectionEls.push(el);
        }
      }
    }

    function updateMostVisibleSectionId() {
      if (!sectionEls.length) {
        setFocusedSectionId('');
        return;
      }
      // Find section with most height
      let mostVisibleSectionEl = sectionEls[0];
      let mostVisibleSectionHeight = getElementVisibleHeight(mostVisibleSectionEl)
      for (let i = 1; i < sectionEls.length; i++) {
        const height = getElementVisibleHeight(sectionEls[i]);
        if (height > mostVisibleSectionHeight) {
          mostVisibleSectionEl = sectionEls[i];
          mostVisibleSectionHeight = height;
        }
      }
      setFocusedSectionId(mostVisibleSectionEl.id);
    }

    updateMostVisibleSectionId();

    window.addEventListener('scroll', updateMostVisibleSectionId);
    window.addEventListener('resize', updateMostVisibleSectionId);
    return () => {
      window.removeEventListener('scroll', updateMostVisibleSectionId)
      window.removeEventListener('resize', updateMostVisibleSectionId);
    };
  }, [links, pathname]);

  let activeNavIndex = -1;
  if (focusedSectionId) {
    activeNavIndex = links.findIndex((n) => n.id === focusedSectionId || n.href.endsWith(focusedSectionId));
  }

  return (
    <>
      <ul className={ulClassName}>
        {links.map(({ href, innerNode }, index) => (
          <li className={liClassName} key={index}>
            <Anchor className={`
              ${activeNavIndex === index ? aActiveClassName : ''} 
              ${aClassName}
            `} href={href} onClick={onNavLinkClick} >
              {innerNode}
            </Anchor>
          </li>
        ))}
      </ul>
    </>
  );
}