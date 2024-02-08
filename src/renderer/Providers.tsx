import * as React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ReactNode } from 'react';
import './App.css';
function Providers({ children }: { children: ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

export default Providers;
