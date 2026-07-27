import { QuoteSection } from "@/components/organisms/QuoteSection/QuoteSection";

export default function Home() {
  return (
    <main>
      <QuoteSection quotes={["quote_item_1", "quote_item_2", "quote_item_3"]} />

      <QuoteSection quotes={["quote_item_4", "quote_item_5", "quote_item_6"]} />
    </main>
  );
}
