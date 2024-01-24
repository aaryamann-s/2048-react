"use client";

import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, BaseProvider } from "baseui";

const engine = new Styletron();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <StyletronProvider value={engine}>
          <BaseProvider theme={LightTheme}>
            <div>hey</div>
            {children}
          </BaseProvider>
        </StyletronProvider>
      </body>
    </html>
  );
}
