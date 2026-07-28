import clsx from "clsx";

type SectionSpacerProps = {
  className?: string;
};

export function SectionSpacer({ className }: SectionSpacerProps) {
  return (
    <div
      aria-hidden="true"
      className={clsx("h-0 sm:h-15 md:h-30 xl:h-60", className)}
      data-testid="section-spacer"
    />
  );
}
