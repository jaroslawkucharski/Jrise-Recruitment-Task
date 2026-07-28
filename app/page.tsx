import { SectionSpacer } from "@/components/atoms/SectionSpacer/SectionSpacer";
import { SlidesSection } from "@/components/organisms/SlidesSection/SlidesSection";
import { QuoteSection } from "@/components/organisms/QuoteSection/QuoteSection";
import { sectionFirstSlides, sectionSecondSlides } from "@/data/slides";
import { quotesFirst, quotesSecond } from "@/data/quotes";
import { getAppTranslations } from "@/i18n/translations";

export default async function Home() {
  const { rich } = await getAppTranslations();

  return (
    <main id="main-content">
      {/* TODO: do zastapienia sekcją */}
      <h1 className="sr-only">{rich("home_h1")}</h1>

      <SectionSpacer />

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
