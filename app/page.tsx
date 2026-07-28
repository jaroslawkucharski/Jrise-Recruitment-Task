import { getTranslations } from "next-intl/server";
import { SectionSpacer } from "@/components/atoms/SectionSpacer/SectionSpacer";
import { SlidesSection } from "@/components/organisms/SlidesSection/SlidesSection";
import { QuoteSection } from "@/components/organisms/QuoteSection/QuoteSection";
import { sectionFirstSlides, sectionSecondSlides } from "@/data/slides";
import { quotesFirst, quotesSecond } from "@/data/quotes";

export default async function Home() {
  const t = await getTranslations();

  return (
    <main id="main-content">
      {/* TODO: do zastapienia sekcją */}
      <h1 className="sr-only">{t("home_h1")}</h1>
      <QuoteSection quotes={quotesFirst} />

      <SectionSpacer />

      <SlidesSection {...sectionFirstSlides} />

      <SectionSpacer />

      <SlidesSection {...sectionSecondSlides} />

      <SectionSpacer />

      <QuoteSection quotes={quotesSecond} />
    </main>
  );
}
