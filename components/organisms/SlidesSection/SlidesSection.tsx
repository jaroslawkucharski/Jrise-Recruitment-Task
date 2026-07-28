"use client";

import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { Box } from "@/components/atoms/Box/Box";
import { Heading } from "@/components/atoms/Heading/Heading";
import { HoverImage } from "@/components/atoms/HoverImage/HoverImage";
import ArrowLeft from "@/public/arrow-left.svg";
import ArrowRight from "@/public/arrow-right.svg";
import Rectangle from "@/public/rectangle.svg";

export type SlideTypes = {
  title?: string;
  description: string;
  imageAlt: string;
  imageSrc: string;
  colorImageSrc: string;
  isImageLoadingEager?: boolean;
};

export type SlidesSectionProps = {
  id: string;
  sectionName: string;
  ariaLabel: string;
  slides: SlideTypes[];
};

export function SlidesSection({
  ariaLabel,
  id,
  sectionName,
  slides,
}: SlidesSectionProps) {
  const t = useTranslations();

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
      aria-label={ariaLabel}
      className="mx-auto w-full max-w-300 overflow-hidden bg-black px-4 sm:px-6 md:px-12 xl:px-0"
    >
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,580px)_minmax(0,1fr)] lg:gap-10">
        <HoverImage
          alt={t(activeSlide.imageAlt)}
          src={activeSlide.imageSrc}
          hoverSrc={activeSlide.colorImageSrc}
          sizes="(min-width: 1280px) 580px, (min-width: 1024px) 100%"
          isLoadingEager={activeSlide.isImageLoadingEager}
        />

        <div className="flex h-full min-h-full flex-col justify-between gap-8">
          <div className="flex flex-col gap-8 lg:gap-10">
            <div className="flex items-center gap-3">
              <Rectangle aria-hidden="true" />

              <Heading level="h4" weight={500}>
                {sectionName}
              </Heading>
            </div>

            <Box
              currentStep={activeIndex + 1}
              title={activeSlide.title}
              description={activeSlide.description}
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
                aria-label={t("process_prev")}
                disabled={previousButtonDisabled}
                isSquare
              >
                <ArrowRight aria-hidden="true" />
              </Button>

              <Button
                className={clsx(
                  !nextButtonDisabled && "hover:[&_path]:fill-neutral-hover",
                )}
                onClick={goToNext}
                aria-label={t("process_next")}
                disabled={nextButtonDisabled}
                isSquare
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
