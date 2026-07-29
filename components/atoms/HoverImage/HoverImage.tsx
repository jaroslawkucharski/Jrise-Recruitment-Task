import clsx from "clsx";
import Image from "next/image";

export type ImageDimensions = {
  width: number;
  height: number;
};

type HoverImageProps = {
  alt: string;
  src: string;
  srcDimensions: ImageDimensions;
  hoverSrc?: string;
  sizes?: string;
  className?: string;
  preload?: boolean;
};

export function HoverImage({
  alt,
  className,
  hoverSrc,
  sizes,
  src,
  srcDimensions,
  preload,
}: HoverImageProps) {
  return (
    <div
      className={clsx(
        "group relative overflow-hidden bg-neutral-800",
        className,
      )}
      data-testid="hover-image"
    >
      <Image
        src={src}
        alt={alt}
        width={srcDimensions.width}
        height={srcDimensions.height}
        className="block w-full transition-opacity duration-300 group-hover:opacity-0"
        sizes={sizes}
        preload={preload}
        data-testid="hover-image-base"
      />

      {hoverSrc ? (
        <Image
          src={hoverSrc}
          alt=""
          aria-hidden="true"
          width={srcDimensions.width}
          height={srcDimensions.height}
          className="absolute inset-0 w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          sizes={sizes}
          preload={preload}
          data-testid="hover-image-hover"
        />
      ) : null}
    </div>
  );
}
