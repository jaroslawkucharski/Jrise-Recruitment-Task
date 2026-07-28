import { SectionSpacer } from "@/components/atoms/SectionSpacer/SectionSpacer";
import { SlidesSection } from "@/components/organisms/SlidesSection/SlidesSection";
import { QuoteSection } from "@/components/organisms/QuoteSection/QuoteSection";
import { sectionFirstSlides, sectionSecondSlides } from "@/data/slides";
import { quotesFirst, quotesSecond } from "@/data/quotes";

export default function Home() {
  return (
    <main>
      <SectionSpacer />

      <QuoteSection quotes={quotesFirst} />

      <SectionSpacer />

      <SlidesSection {...sectionFirstSlides} />

      <SectionSpacer />

      <SlidesSection {...sectionSecondSlides} />

      <SectionSpacer />

      <QuoteSection quotes={quotesSecond} />

      <SectionSpacer />
    </main>
  );
}
