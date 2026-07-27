"use client";

import AutoScroll from "embla-carousel-auto-scroll";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { quotes } from "@/data/quotes";

const AUTO_SCROLL_SPEED = 1.2;

export function QuoteSection() {
  const repeatedQuotes = useMemo(() => [...quotes, ...quotes], []);

  const autoScroll = useMemo(
    () =>
      AutoScroll({
        direction: "forward",
        speed: AUTO_SCROLL_SPEED,
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
      aria-label="Cytaty"
      className="relative h-149 w-full overflow-hidden bg-black"
    >
      <div className="flex h-full items-center">
        <div ref={emblaRef} className="w-full overflow-hidden">
          <div className="flex items-center">
            {repeatedQuotes.map((quote, index) => {
              const isActive = index === selectedIndex;

              return (
                <article
                  key={`${quote.id}-${index}`}
                  className="min-w-0 shrink-0 grow-0 basis-auto"
                >
                  <div
                    className={`
                      mx-auto w-fit
                      transition-[filter,transform,opacity]
                      duration-500 ease-out
                      ${
                        isActive
                          ? "scale-100 opacity-100 blur-0"
                          : "scale-[0.985] opacity-50 blur-xs"
                      }
                    `}
                  >
                    <p className="text-[32px] font-medium md:text-[48px] ml-30 md:ml-60">
                      <span className="block">{quote.lines[0]}</span>
                      <span className="block">{quote.lines[1]}</span>
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
