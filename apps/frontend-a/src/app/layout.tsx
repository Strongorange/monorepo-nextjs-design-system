import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@design-system-test/ui/styles";
import "./globals.css";

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
        // ds-ui 패키지에서 제공하는 클래스를 사용하기 위해 추가 필수임!!!!!!!!!!!!!!!!
        className={`${geistSans.variable} ${geistMono.variable} antialiased ds-ui`}
        style={{ padding: 20 }}
        // 과거의 잔재 때문에 주석처리 그런데 혹시 모르니 삭제는 하지 않음
        // data-ds-theme
      >
        {children}
      </body>
    </html>
  );
}
