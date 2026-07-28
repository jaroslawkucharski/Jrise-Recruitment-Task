import { SlidesSection } from "@/components/organisms/SlidesSection/SlidesSection";
import { QuoteSection } from "@/components/organisms/QuoteSection/QuoteSection";
import { sectionSecondSlides } from "@/data/slides";
import { quotesFirst, quotesSecond } from "@/data/quotes";

export default function Home() {
  return (
    <main>
      <QuoteSection quotes={quotesFirst} />

      <SlidesSection {...sectionSecondSlides} />

      <QuoteSection quotes={quotesSecond} />
    </main>
  );
}
