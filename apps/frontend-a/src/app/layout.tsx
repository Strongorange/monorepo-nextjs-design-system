import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@design-system-test/ui/styles";
import "./globals.css";
import { StyleIsolationProvider } from "@design-system-test/ui";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Design System Test",
  description: "Testing isolated design system components",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ padding: 20 }}
      >
        <StyleIsolationProvider>{children}</StyleIsolationProvider>
      </body>
    </html>
  );
}
