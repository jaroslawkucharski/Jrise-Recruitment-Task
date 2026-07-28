import clsx from "clsx";
import Image from "next/image";

type HoverImageProps = {
  alt: string;
  src: string;
  hoverSrc?: string;
  sizes: string;
  className?: string;
  isLoadingEager?: boolean;
};

export function HoverImage({
  alt,
  className,
  hoverSrc,
  sizes,
  src,
  isLoadingEager,
}: HoverImageProps) {
  const loading = isLoadingEager ? "eager" : undefined;

  return (
    <div
      className={clsx(
        "group relative aspect-580/472 overflow-hidden bg-neutral-800",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-opacity duration-300 group-hover:opacity-0"
        sizes={sizes}
        loading={loading}
      />

      {hoverSrc ? (
        <Image
          src={hoverSrc}
          alt=""
          aria-hidden="true"
          fill
          className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          sizes={sizes}
          loading={loading}
        />
      ) : null}
    </div>
  );
}
