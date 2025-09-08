'use client';
import React, { createContext, useContext, useState } from 'react';

const HideNavFooterContext = createContext();

export function HideNavFooterProvider({ children }) {
  const [hideNavFooter, setHideNavFooter] = useState(true);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      if (params.get('inApp') === '1') {
        setHideNavFooter(true);
      } else {
        setHideNavFooter(false);
      }
    }
  }, []);

  return (
    <HideNavFooterContext.Provider value={{ hideNavFooter, setHideNavFooter }}>
      {children}
    </HideNavFooterContext.Provider>
  );
}

export function useHideNavFooter() {
  return useContext(HideNavFooterContext);
}
