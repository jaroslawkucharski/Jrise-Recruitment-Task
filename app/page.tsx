import { HeroSection } from "@/components/organisms/HeroSection/HeroSection";
import { SectionSpacer } from "@/components/atoms/SectionSpacer/SectionSpacer";
import { SlidesSection } from "@/components/organisms/SlidesSection/SlidesSection";
import { QuoteSection } from "@/components/organisms/QuoteSection/QuoteSection";
import {
  sectionFirstSlides,
  sectionSecondSlides,
  sectionThirdSlides,
} from "@/data/slides";
import { quotesFirst, quotesSecond } from "@/data/quotes";

export default function Home() {
  return (
    <main id="main-content">
      <HeroSection />

      <SectionSpacer />

      <QuoteSection quotes={quotesFirst} />

      <SectionSpacer />

      <SlidesSection {...sectionFirstSlides} />

      <SectionSpacer />

      <SlidesSection {...sectionSecondSlides} />

      <SectionSpacer />

      <QuoteSection quotes={quotesSecond} />

      <SectionSpacer />

      <SlidesSection {...sectionThirdSlides} />

      <SectionSpacer />
    </main>
  );
}
