"use client"

import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, DarkTheme, BaseProvider } from "baseui";

const engine = new Styletron();

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    
    <StyletronProvider value={engine}>
    <BaseProvider theme={DarkTheme}>
      {children}
    
      </BaseProvider>
        </StyletronProvider>
  )
} 