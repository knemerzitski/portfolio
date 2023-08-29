"use client";

import { useState } from 'react';

import Icon from '@/components/info/Icon';
import NavItems, { NavLink } from '@/components/nav/NavItems';

import { name as portfolioName, resumeUrl, resumeVersion } from '@/app/portfolio';

import classNames from 'classnames';
import Anchor from '@/components/nav/Anchor';

const links: NavLink[] = [
  {
    href: '/#home',
    id: 'home',
    innerNode: 'Home'
  },
  {
    href: '/#about',
    innerNode: 'About',
  },
  {
    href: '/#projects',
    innerNode: 'Projects',
  },
  {
    href: '/#skills',
    innerNode: 'Skills',
  },
  {
    href: '/#contact',
    innerNode: 'Contact',
  },
  {
    href: `${resumeUrl}?v=${resumeVersion}`,
    innerNode: (
      <span className="relative">
        Resume
        <span className="sr-only">External PDF File</span>
        <Icon type="externalLink" className="w-3 h-auto absolute right-0 top-0 translate-x-4 no-a-outline" />
      </span>
    ),
  }
];

export default function TopNav() {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);

  const topNavId = 'topnav';

  return (
    <>
      {/* Using checkbox so that burger menu works without javascript too */}
      <input type="checkbox" id={topNavId}
        onChange={() => setMobileNavOpen(!isMobileNavOpen)}
        checked={isMobileNavOpen} className="checkbox" hidden
      />
      {/* OVERLAY ON MOBILE MENU OPEN */}
      <label htmlFor={topNavId} className={classNames(
        'overlay',
        'fixed w-full h-full',
        'bg-overlay/50',
        'z-10',
        'invisible md:hidden'
      )}></label>

      <header className="fixed w-full z-10 top-0">

        {/* DESKTOP & MOBILE WITH ICON */}
        <div className={classNames(
          'mainNav',
          'px-6 md:px-10',
          'bg-primary-800/95',
          'backdrop-blur-xs',
          'shadow-dp24 shadow-black/40'
        )}>
          <div className="max-w-screen-lg mx-auto flex items-center justify-between">
            {/* DESKTOP NAV */}
            <nav className={classNames(
              'hidden',
              'md:block'
            )}>
              <NavItems
                links={links}
                ulClassName="flex gap-2 text-lg"
                aActiveClassName="text-secondary-500"
                aClassName='block px-2 py-8 font-medium hover:text-secondary-500'
              />
            </nav>

            {/* MOBILE ICON */}
            <label htmlFor={topNavId} className={classNames(
              'relative',
              'px-2 py-4 md:py-6',
              'text-xl',
              'hover:cursor-pointer',
              'block md:hidden'
            )}>
              <div className="w-5 h-5">
                <div className="openIcon absolute visible">
                  <span className="sr-only">Open Menu</span>
                  <Icon type="bars" className="w-auto h-5" />
                </div>
                <div className="closeIcon absolute invisible">
                  <span className="sr-only">Close Menu</span>
                  <Icon type="xmark" className="w-auto h-5" />
                </div>
              </div>
            </label>

            {/* NAME */}
            <div className="flex">
              <Anchor className="text-base ml-4" href="/">{portfolioName}</Anchor>
            </div>
          </div>
        </div>

        {/* MOBILE STACK MENU */}
        <div className={classNames(
          'mobileMenu',
          'absolute w-[95%]',
          'bg-primary-800',
          'border border-solid border-transparent border-t-primary-950',
          'shadow-dp6 shadow-shadow/60',
          'md:hidden -z-10',
          'invisible'
        )}>

          {/* MOBILE NAV */}
          <nav className="overflow-y-auto max-h-[calc(100vh-4.5rem)] short:overflow-y-hidden short:max-h-max">
            <NavItems
              links={links}
              ulClassName="flex flex-col text-lg divide-y divide-primary-400"
              aActiveClassName="text-secondary-500"
              aClassName="block px-12 py-4 tall:py-7 font-medium hover:text-secondary-500"
              onNavLinkClick={() => setMobileNavOpen(false)}
            />
          </nav>

        </div>
      </header>

      <style jsx>{`
        .overlay {
          transition: all .2s linear, width 0s linear, height 0s linear;
          opacity: 0;
        }
        .checkbox:checked ~ .overlay {
          visibility: visible;
          opacity: 1;
        }
        
        .checkbox ~ header > .mainNav {
          transition: box-shadow .25s ease;
        }
        
        .checkbox:checked ~ header > .mainNav {
          transition-duration: .1s;
          --tw-shadow-color: transparent;
        }
        
        .checkbox ~ header .mobileMenu {
          transition: all .25s ease;
          transform: translateY(-100%);
          opacity: 0;
        }
        
        .checkbox:checked ~ header .mobileMenu {
          transition-duration: .1s;
          transform: translateY(0%);
          opacity: 1;
          visibility: visible;
        }
        
        .checkbox:checked ~ header .openIcon {
          visibility: hidden;
        }
        
        .checkbox:checked ~ header .closeIcon {
          visibility: visible;
        }
    `}</style>
    </>
  );
}