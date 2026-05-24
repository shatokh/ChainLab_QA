import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ChainLab QA",
  description: "Local-first Web3 QA Automation playground skeleton.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
