'use client';

import { SnackbarProvider as NotistackProvider } from 'notistack';
import { ReactNode } from 'react';

interface ProviderProps {
  children: ReactNode;
}

export const SnackbarProvider = ({ children }: ProviderProps) => {
  return (
    <NotistackProvider 
      maxSnack={3}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={3000}
    >
      {children}
    </NotistackProvider>
  );
};