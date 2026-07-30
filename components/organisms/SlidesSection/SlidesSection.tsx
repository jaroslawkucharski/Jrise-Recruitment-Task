"use client";

import clsx from "clsx";
import { useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Box, BoxPaddingTypes } from "@/components/atoms/Box/Box";
import { Heading } from "@/components/atoms/Heading/Heading";
import {
  HoverImage,
  type ImageDimensions,
} from "@/components/atoms/HoverImage/HoverImage";
import { MessageKey } from "@/i18n/messages";
import { useAppTranslations } from "@/i18n/translations";
import ArrowLeft from "@/public/arrow-left.svg";
import ArrowRight from "@/public/arrow-right.svg";
import Rectangle from "@/public/rectangle.svg";

export type SlideTypes = {
  title?: MessageKey;
  description: MessageKey;
  imageAlt: MessageKey;
  imageSrc: string;
  imageSrcDimensions: ImageDimensions;
  colorImageSrc: string;
  imagePreload?: boolean;
};

export type SlidesSectionProps = {
  id: string;
  sectionName: MessageKey;
  ariaLabel: MessageKey;
  slides: SlideTypes[];
  boxPadding?: BoxPaddingTypes;
  hasBackground?: boolean;
  reverse?: boolean;
};

export function SlidesSection({
  ariaLabel,
  id,
  sectionName,
  slides,
  boxPadding,
  hasBackground = true,
  reverse = false,
}: SlidesSectionProps) {
  const t = useAppTranslations();

  const [activeIndex, setActiveIndex] = useState(0);

  const activeSlide = slides[activeIndex];

  const previousButtonDisabled = activeIndex === 0;
  const nextButtonDisabled = activeIndex === slides.length - 1;

  const goToPrevious = () => {
    if (previousButtonDisabled) return;

    setActiveIndex((currentIndex) => currentIndex - 1);
  };

  const goToNext = () => {
    if (nextButtonDisabled) return;

    setActiveIndex((currentIndex) => currentIndex + 1);
  };

  return (
    <section
      id={id}
      aria-label={t(ariaLabel)}
      className="mx-auto w-full max-w-300 overflow-hidden bg-black px-4 sm:px-6 md:px-12 xl:px-0"
      data-testid="slides-section"
    >
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,580px)_minmax(0,1fr)] lg:gap-10">
        <HoverImage
          alt={t(activeSlide.imageAlt)}
          src={activeSlide.imageSrc}
          srcDimensions={activeSlide.imageSrcDimensions}
          hoverSrc={activeSlide.colorImageSrc}
          sizes="(min-width: 1024px) 580px, 100%"
          className={clsx(reverse && "lg:order-2")}
          preload={activeSlide.imagePreload}
        />

        <div
          className={clsx(
            "flex h-full min-h-full flex-col justify-between gap-8",
            reverse && "lg:order-1",
          )}
        >
          <div className="flex flex-col gap-8 lg:gap-10">
            <div className="flex items-center gap-3">
              <Rectangle aria-hidden="true" />

              <Heading level="h4" weight={500}>
                {t(sectionName)}
              </Heading>
            </div>

            <Box
              currentStep={activeIndex + 1}
              title={activeSlide.title}
              description={activeSlide.description}
              padding={boxPadding}
              hasBackground={hasBackground}
            />
          </div>

          <div className="flex w-full justify-end">
            <div className="flex items-center gap-3">
              <Button
                className={clsx(
                  !previousButtonDisabled &&
                    "hover:[&_path]:fill-neutral-hover",
                )}
                onClick={goToPrevious}
                aria-label={t("section_slides_prev")}
                disabled={previousButtonDisabled}
                isSquare
                data-testid="slides-prev-button"
              >
                <ArrowRight aria-hidden="true" />
              </Button>

              <Button
                className={clsx(
                  !nextButtonDisabled && "hover:[&_path]:fill-neutral-hover",
                )}
                onClick={goToNext}
                aria-label={t("section_slides_next")}
                disabled={nextButtonDisabled}
                isSquare
                data-testid="slides-next-button"
              >
                <ArrowLeft aria-hidden="true" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
