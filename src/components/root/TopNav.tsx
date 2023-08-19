"use client";

import styles from './TopNav.module.css';

import { useState } from 'react';

import Icon from '@/components/info/Icon';
import NavItems, { NavLink } from '@/components/nav/NavItems';

import { name as portfolioName, resumeUrl, resumeVersion } from '@/app/portfolio';

const links: NavLink[] = [
  {
    href: '/',
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
        checked={isMobileNavOpen} className={styles.checkbox} hidden
      />
      {/* OVERLAY ON MOBILE MENU OPEN */}
      <label htmlFor={topNavId} className={`
        fixed w-full h-full
        bg-overlay/50
        z-10
        invisible md:hidden
        ${styles.overlay}
      `}></label>

      <header className="
        fixed w-full z-10 top-0
      ">

        {/* DESKTOP & MOBILE WITH ICON */}
        <div className={`
          px-6 md:px-10

          bg-primary-800/95
          backdrop-blur-xs
          shadow-dp24 shadow-black/40
          ${styles.mainNav}
        `}>
          <div className="
            max-w-screen-lg mx-auto
            flex items-center justify-between
          ">
            {/* DESKTOP NAV */}
            <nav className={`
              hidden
              md:block
            `}>
              <NavItems
                links={links}
                ulClassName="flex gap-2 text-lg"
                aActiveClassName="text-secondary-500"
                aClassName='block px-2 py-8 font-medium hover:text-secondary-500'
              />
            </nav>

            {/* MOBILE ICON */}
            <label htmlFor={topNavId} className={`
              relative 
              px-2 py-4 md:py-6
              text-xl
              hover:cursor-pointer
              block md:hidden
            `}>
              <div className="w-5 h-5">
                <div className={`absolute visible ${styles.openIcon}`}>
                  <span className="sr-only">Open Menu</span>
                  <Icon type="bars" className="w-auto h-5" />
                </div>
                <div className={`absolute invisible ${styles.closeIcon}`}>
                  <span className="sr-only">Close Menu</span>
                  <Icon type="xmark" className="w-auto h-5" />
                </div>
              </div>
            </label>

            {/* NAME */}
            <div className="flex">
              <span className="text-base ml-4">{portfolioName}</span>
            </div>
          </div>
        </div>

        {/* MOBILE STACK MENU */}
        <div className={`
          absolute w-[95%] 
          bg-primary-800
          border border-solid border-transparent border-t-primary-950 
          shadow-dp6 shadow-shadow/60
          md:hidden -z-10
          invisible ${styles.mobileMenu}
        `}>

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
    </>
  );
}