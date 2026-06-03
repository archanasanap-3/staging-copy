'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type CursorStyle = 'default' | 'nav' | 'link' | 'text';

interface CursorContextType {
  cursorStyle: CursorStyle;
  setCursorStyle: (style: CursorStyle) => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorStyle: 'default',
  setCursorStyle: () => {},
});

export function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorStyle, setCursorStyleState] = useState<CursorStyle>('default');

  const setCursorStyle = useCallback((style: CursorStyle) => {
    setCursorStyleState(style);
  }, []);

  return (
    <CursorContext.Provider value={{ cursorStyle, setCursorStyle }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursorStyle() {
  return useContext(CursorContext);
}
