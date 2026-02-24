'use client';

import React, { createContext, useContext } from 'react';

type PreviewContextValue = {
  isPreview: boolean;
};

const PreviewContext = createContext<PreviewContextValue>({
  isPreview: false
});

export function PreviewProvider({ isPreview, children }: { isPreview: boolean; children: React.ReactNode }) {
  return <PreviewContext.Provider value={{ isPreview }}>{children}</PreviewContext.Provider>;
}

export function usePreview() {
  return useContext(PreviewContext);
}
