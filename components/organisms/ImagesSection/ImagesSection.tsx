"use client";

import { HoverImage } from "@/components/atoms/HoverImage/HoverImage";
import { type ImageDimensions } from "@/components/atoms/HoverImage/HoverImage";
import { type MessageKey } from "@/i18n/messages";
import { useAppTranslations } from "@/i18n/translations";

export type ImageTile = {
  src: string;
  hoverSrc: string;
  dimensions: ImageDimensions;
};

export type ImagesSectionProps = {
  ariaLabelKey: MessageKey;
  primaryColumn: ImageTile[];
  secondaryColumn: ImageTile[];
  thirdColumn: ImageTile[];
};

function ImageColumn({
  className,
  images,
}: {
  className?: string;
  images: ImageTile[];
}) {
  return (
    <div className={className}>
      {images.map((image) => (
        <HoverImage
          key={image.src}
          alt=""
          src={image.src}
          hoverSrc={image.hoverSrc}
          srcDimensions={image.dimensions}
        />
      ))}
    </div>
  );
}

export function ImagesSection({
  ariaLabelKey,
  primaryColumn,
  secondaryColumn,
  thirdColumn,
}: ImagesSectionProps) {
  const t = useAppTranslations();

  return (
    <section
      aria-label={t(ariaLabelKey)}
      className="mx-auto flex w-full max-w-300 flex-col gap-3 px-4 sm:px-6 md:px-12 xl:px-0 overflow-hidden xl:flex-row xl:items-center xl:justify-center"
      data-testid="images-section"
    >
      <ImageColumn
        className="flex w-full flex-col gap-3 xl:w-87.5 xl:flex-none"
        images={primaryColumn}
      />

      <ImageColumn
        className="flex w-full flex-col gap-3 xl:w-119 xl:flex-none"
        images={secondaryColumn}
      />

      <ImageColumn
        className="flex w-full flex-col gap-3 xl:w-87.5 xl:flex-none"
        images={thirdColumn}
      />
    </section>
  );
}
