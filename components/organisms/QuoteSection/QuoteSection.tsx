"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import useEmblaCarousel from "embla-carousel-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";

type QuoteSectionProps = {
  quotes: string[];
};

export function QuoteSection({ quotes }: QuoteSectionProps) {
  const t = useTranslations();

  const repeatedQuotes = useMemo(() => [...quotes, ...quotes], [quotes]);

  const autoScroll = useMemo(
    () =>
      AutoScroll({
        direction: "forward",
        speed: 2,
        startDelay: 0,
        playOnInit: true,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
        stopOnFocusIn: false,
      }),
    [],
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: "center",
      startIndex: quotes.length,
      skipSnaps: false,
      containScroll: false,
    },
    [autoScroll],
  );

  const [selectedIndex, setSelectedIndex] = useState(quotes.length);

  const updateSelectedIndex = useCallback(() => {
    if (!emblaApi) return;

    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const rafId = window.requestAnimationFrame(updateSelectedIndex);

    emblaApi.on("select", updateSelectedIndex);
    emblaApi.on("reInit", updateSelectedIndex);

    const autoScrollPlugin = emblaApi.plugins().autoScroll;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      autoScrollPlugin?.stop();
    } else {
      autoScrollPlugin?.play();
    }

    return () => {
      window.cancelAnimationFrame(rafId);
      emblaApi.off("select", updateSelectedIndex);
      emblaApi.off("reInit", updateSelectedIndex);
    };
  }, [emblaApi, updateSelectedIndex]);

  return (
    <section
      id="quotes"
      aria-label={t("quote_aria")}
      className="relative h-60 lg:h-149 w-full overflow-hidden bg-black"
    >
      <div className="flex h-full items-center">
        <div ref={emblaRef} className="w-full overflow-hidden">
          <div className="flex items-center">
            {repeatedQuotes.map((quote, index) => {
              const isActive = index === selectedIndex;

              return (
                <article
                  key={`${quote}-${index}`}
                  className="min-w-0 shrink-0 grow-0 basis-auto"
                >
                  <div
                    className={`
                      mx-auto w-fit transform-gpu will-change-transform
                      transition-[transform,opacity]
                      duration-300 ease-out
                      ${
                        isActive
                          ? "scale-100 opacity-100 blur-0 [text-shadow:0_0_24px_rgba(255,255,255,0.08)]"
                          : "scale-[0.985] opacity-42 blur-[2px]"
                      }
                    `}
                  >
                    <p className="ml-30 text-[32px] font-medium text-white lg:ml-60 lg:text-[48px]">
                      {t.rich(quote, {
                        br: () => <br />,
                        text: (chunk) => (
                          <span className="text-brand-green">{chunk}</span>
                        ),
                      })}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
