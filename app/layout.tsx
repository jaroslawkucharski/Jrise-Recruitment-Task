import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/organisms/Header/Header";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export const metadata: Metadata = {
  title: "POSTPRODUKCJADZWIEKU.PL",
  description:
    "Profesjonalna postprodukcja dźwięku dla twórców filmowych i marek.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${inter.variable}`}>
      <body className="min-h-screen bg-neutral-hover text-neutral-0">
        <Header />

        {children}
      </body>
    </html>
  );
}
