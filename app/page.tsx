import { BeforeAfterSection } from "@/components/organisms/BeforeAfterSection/BeforeAfterSection";
import { HeroSection } from "@/components/organisms/HeroSection/HeroSection";
import { ImagesSection } from "@/components/organisms/ImagesSection/ImagesSection";
import { SectionSpacer } from "@/components/atoms/SectionSpacer/SectionSpacer";
import { SlidesSection } from "@/components/organisms/SlidesSection/SlidesSection";
import { QuoteSection } from "@/components/organisms/QuoteSection/QuoteSection";
import { beforeAfterSectionData } from "@/data/beforeAfter";
import { imagesSectionData } from "@/data/images";
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

      <ImagesSection {...imagesSectionData} />

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

      <BeforeAfterSection {...beforeAfterSectionData} />

      <SectionSpacer />
    </main>
  );
}
