"use client";

import { HTMLAttributes, createContext, useContext, useRef, useState } from "react";

const OverflowYContext = createContext((prevent: boolean) => { });

export function usePreventBodyScrollContext() {
  return useContext(OverflowYContext);
}

export function Body({ children, className, ...restProps }: HTMLAttributes<HTMLBodyElement>) {
  const bodyRef = useRef<HTMLBodyElement | null>(null);

  const [isOverflowYHidden, setIsOverFlowYHidden] = useState(false);

  function handleIsOverflowYHidden(hidden: boolean) {
    setIsOverFlowYHidden(hidden);
  }

  return (
    <body className={`
      ${className}
      ${isOverflowYHidden ? 'mobile:overflow-y-hidden' : ''}
    `} {...restProps} ref={bodyRef}>
      <OverflowYContext.Provider value={handleIsOverflowYHidden}>
        {children}
      </OverflowYContext.Provider>
    </body>
  );
}