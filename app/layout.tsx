import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "flowbite/dist/flowbite.css";
import ErrorBoundary from "@/components/organisms/ErrorBoundary";
import ErrorFallback from "@/components/organisms/ErrorFallback";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Book Library App",
  description: "A simple book library application built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ErrorBoundary fallback={<ErrorFallback />}>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
