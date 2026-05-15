import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fishbulb Solutions – Software Development Services",
  description:
    "We create custom software, websites, and applications to meet the goals of your business.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
