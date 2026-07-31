"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { RevealText } from "@/components/atoms/RevealText/RevealText";
import { MessageKey } from "@/i18n/messages";
import { useAppTranslations } from "@/i18n/translations";

type QuoteSectionProps = {
  quotes: MessageKey[];
};

export function QuoteSection({ quotes }: QuoteSectionProps) {
  const t = useAppTranslations();

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
      watchDrag: false,
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
      aria-label={t("quote_aria")}
      className="relative w-full overflow-hidden bg-black"
    >
      <div aria-hidden="true" className="flex h-full items-center">
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
                          ? "scale-100 opacity-100 blur-0 [text-shadow:0_0_24px_var(--color-neutral-0-8)]"
                          : "scale-[0.985] opacity-42 blur-[2px]"
                      }
                    `}
                  >
                    <p className="ml-30 text-[32px] font-medium text-neutral-0 lg:ml-60 lg:text-[48px]">
                      <RevealText>{t(quote)}</RevealText>
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
