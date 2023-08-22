import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import TopNav from '@/app/content/TopNav';

import Icon from '@/components/info/Icon';
import TextLink from '@/components/nav/TextLink';
import Content from '@/components/container/Content';
import { metaTitle, metaDescription, githubUrl, emailAddress, name as portfolioName } from '@/app/portfolio';
import { CookieConsentContextProvider } from '@/contexts/CookieConsentContext';
import { ReactNode } from 'react';
import { CookieConsentLink, HashTaskOpenCookieConsentModal, NewVisitorOpenCookieConsentModal } from '@/app/content/CookieConsentModal';
import { ModalsContextProvider } from '@/contexts/ModalsContext';
import Anchor from '@/components/nav/Anchor';
import { Body } from '@/components/container/Body';
import { HashContextProvider } from '@/contexts/HashContext';
import { GoogleTagManagerScript } from '@/libs/gtm';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  fallback: ['system-ui', 'sans-serif'],
});

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
}

export default function RootLayout({ children, }: { children: ReactNode, }) {
  return (
    <html lang="en">
      <Body className={`
        ${inter.className}
          text-text
          bg-background
          h-screen
      `}>
        <CookieConsentContextProvider>
          <HashContextProvider>
            <GoogleTagManagerScript />

            <ModalsContextProvider>


              <HashTaskOpenCookieConsentModal />
              <NewVisitorOpenCookieConsentModal />


              <TopNav />

              <main className="min-h-screen">
                {children}
              </main>

              <footer className="bg-primary-800 pt-10 pb-4">
                <Content>
                  <ul className="flex gap-6 justify-end">
                    <li>
                      <Anchor href={githubUrl}>
                        <span className="sr-only">GitHub</span>
                        <Icon type="github" className="w-auto h-6" />
                      </Anchor>

                    </li>
                    <li>
                      <address>
                        <Anchor href={`mailto:${emailAddress}`}>
                          <span className="sr-only">{emailAddress}</span>
                          <Icon type="envelope" className="w-auto h-6 text-text hover:text-text" />
                        </Anchor>
                      </address>
                    </li>
                  </ul>
                </Content>

                <hr className="h-px mt-10 mb-10 bg-primary-50 border-0" />
                <Content className="relative text-sm text-text/90 flex flex-col gap-2 justify-start">
                  <CookieConsentLink className="self-start">Update cookies</CookieConsentLink>

                  <div className="flex justify-between items-end gap-4">
                    <div className="max-w-xs lg:max-w-md">
                      &copy; Copyright 2023. Made by <TextLink className="inline" href="/">{portfolioName}</TextLink>
                    </div>

                    <div className="max-w-xs text-end">
                      Built with <TextLink href="https://nextjs.org/">Next.js</TextLink> and
                      deployed in <TextLink href="https://aws.amazon.com/">AWS</TextLink>.
                    </div>
                  </div>
                </Content>
              </footer>

            </ModalsContextProvider>
          </HashContextProvider>
        </CookieConsentContextProvider>
      </Body>
    </html >
  )
}
