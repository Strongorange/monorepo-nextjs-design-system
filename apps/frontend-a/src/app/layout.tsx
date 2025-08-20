import type { Metadata } from "next";
import "./globals.css";

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
      <body className={`antialiased`} style={{ padding: 20 }}>
        {children}
      </body>
    </html>
  );
}
