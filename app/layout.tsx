import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import "./globals.css";
import { Header } from "@/components/organisms/Header/Header";
import { getAppTranslations } from "@/i18n/translations";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  fallback: ["Arial", "Helvetica", "sans-serif"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getAppTranslations();

  const siteUrl = new URL("https://jrise-recruitment-task.vercel.app");

  return {
    metadataBase: siteUrl,
    title: t("meta_title"),
    description: t("meta_description"),
    alternates: {
      canonical: "/",
    },
    openGraph: {
      title: t("meta_title"),
      description: t("meta_description"),
      type: "website",
      locale: "pl_PL",
      url: "/",
      siteName: t("meta_title"),
      images: [
        {
          url: "/section_01_01_color.webp",
          width: 1160,
          height: 676,
          alt: t("meta_title"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("meta_title"),
      description: t("meta_description"),
      images: ["/section_01_01_color.webp"],
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
