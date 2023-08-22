"use client";

import { MouseEvent, ReactNode, useEffect, useRef } from "react";
import { usePreventBodyScrollContext } from "@/components/container/Body";
import classNames from 'classnames';

export interface ModalProps {
  overlayCloseable?: boolean,
  overlay?: boolean,
  position?: 'top' | 'center' | 'bottom' | 'bottom-left'
  onClose?: () => void,
}

export default function Modal({
  children,
  className = '',
  overlay = false,
  position = 'top',

  overlayCloseable = true,
  onClose = () => { },
}: {
  children: ReactNode,
  className?: string,
} & ModalProps) {
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const preventScroll = usePreventBodyScrollContext();

  useEffect(() => {
    const curOverlay = overlay;
    if (curOverlay) {
      preventScroll(true);
    }
    return () => {
      if (curOverlay) {
        preventScroll(false)
      }
    };
  }, [overlay, preventScroll])

  function handleClickOutsideModal() {
    if (overlayCloseable ?? true) {
      onClose();
    }
  }

  function handleClickModal(e: MouseEvent<HTMLElement>) {
    e.stopPropagation();
  }

  // Default top
  let positionClass = '';
  switch (position) {
    case 'top':
      positionClass = `left-1/2 -translate-x-1/2
        top-1 short:top-10 tall:top-20
        w-max max-w-[95%] sm:max-w-xl 
        max-h-[80%]
      `;
      break;
    case 'center':
      positionClass = `
        left-1/2 -translate-x-1/2 
        top-1/2 -translate-y-1/2
        w-max max-w-[95%] sm:max-w-xl 
        max-h-[80%]
      `;
      break;
    case 'bottom':
      positionClass = `
        left-1/2 -translate-x-1/2
        bottom-1 short:bottom-2 tall:bottom-4
        w-max max-w-[95%] sm:max-w-xl 
        max-h-[80%]
        `;
      break;
    case 'bottom-left':
      positionClass = `
          left-1 short:left-2 tall:left-4
          bottom-1 short:bottom-2 tall:bottom-4
          w-max max-w-[95%] sm:max-w-xl 
          max-h-[80%]
          `;
      break;
  }

  return (
    <>
      {overlay && <div className={classNames(
        'z-10 fixed top-0 left-0 w-full h-full bg-overlay/40'
      )}
        onClick={handleClickOutsideModal} ref={overlayRef}>
      </div>}

      {/* absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 */}
      <div className={classNames(
        positionClass,
        'z-10 fixed overflow-y-auto',
        'bg-primary-600 shadow-dp24 shadow-shadow/50 rounded'
      )} onClick={handleClickModal}>
        <div className={classNames(
          'w-full h-full',
          'p-3 py-4 xs:p-6',
          className
        )}>
          {children}
        </div>
      </div>

    </>
  );
}