import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import "./globals.css";
import { Header } from "@/components/organisms/Header/Header";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("meta_title"),
    description: t("meta_description"),
    openGraph: {
      title: t("meta_title"),
      description: t("meta_description"),
      type: "website",
      locale: "pl_PL",
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta_title"),
      description: t("meta_description"),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable}`}>
      <body className="min-h-screen bg-neutral-hover text-neutral-0">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />

          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
