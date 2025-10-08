import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import PocBar from "@/components/PocBar";
import DevLayout from "@/components/DevLayout";
import Footer from "@/components/Footer";
import BitcoinOSWrapper from "@/components/BitcoinOSWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bitcoin Identity - Secure Identity Management",
  description: "Secure identity management and authentication system for Bitcoin SV applications",
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
  },
  openGraph: {
    title: "Bitcoin Identity - Secure Identity Management",
    description: "Secure identity management and authentication system for Bitcoin SV applications",
    siteName: "Bitcoin Identity",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bitcoin Identity - Secure Identity Management",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitcoin Identity - Secure Identity Management",
    description: "Secure identity management and authentication system for Bitcoin SV applications",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <BitcoinOSWrapper>
            <DevLayout>
              <div style={{ minHeight: 'calc(100vh - 32px)', display: 'flex', flexDirection: 'column' }}>
                {children}
                <Footer />
              </div>
            </DevLayout>
          </BitcoinOSWrapper>
        </Providers>
      </body>
    </html>
  );
}