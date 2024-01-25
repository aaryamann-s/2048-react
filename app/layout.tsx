'use client';

import { Client as Styletron } from "styletron-engine-monolithic";
import { Provider as StyletronProvider } from "styletron-react";
import { LightTheme, DarkTheme, BaseProvider } from "baseui";
import Header from "../src/components/Header";

const engine = new Styletron();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#111", width: "100%", height: "100%" }}>
        <StyletronProvider value={engine}>
          <BaseProvider theme={DarkTheme}>
            <Header />
            <div
              style={{
                marginTop: 90,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
              }}
            >
              {children}
            </div>
          </BaseProvider>
        </StyletronProvider>
      </body>
    </html>
  );
}
