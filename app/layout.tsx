import type { Metadata } from "next";

import { Inter, Carlito } from "next/font/google";
import "./globals.css";

import { ToastProvider } from "@/providers/toast-provider";
import { GlobalContextProvider } from "@/context/global-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Black Marker",
  description: "Generate resumes with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>
          <ToastProvider />
          {children}
        </GlobalContextProvider>
      </body>
    </html>
  );
}
