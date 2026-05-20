import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fishbulb Solutions – Software Development Services",
  description:
    "We create custom software, websites, and applications to meet the goals of your business.",
  metadataBase: new URL("https://www.fishbulbsolutions.com.au"),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Fishbulb Solutions",
  url: "https://www.fishbulbsolutions.com.au",
  telephone: "+61290031015",
  description:
    "We create custom software, websites, and applications to meet the goals of your business.",
  address: {
    "@type": "PostalAddress",
    addressCountry: "AU",
  },
  sameAs: [],
  serviceType: [
    "Custom Software Development",
    "AI Automations",
    "Web Design & Development",
    "FileMaker Development",
    "Rapid Integrations",
    "UX/UI Design",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
