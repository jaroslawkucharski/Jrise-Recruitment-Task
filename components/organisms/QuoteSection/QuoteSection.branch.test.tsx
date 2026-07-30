"use client";

import { screen } from "@testing-library/react";
import { quotesFirst } from "@/data/quotes";
import { renderWithIntl, t } from "@/utils/renderWithIntl";
import { vi } from "vitest";

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();

  return {
    ...actual,
    useCallback: <T extends (...args: never[]) => unknown>(
      callback: T,
      dependencies: readonly unknown[],
    ) => {
      const memoizedCallback = actual.useCallback(callback, dependencies);

      callback();

      return memoizedCallback;
    },
  };
});

vi.mock("embla-carousel-auto-scroll", () => ({
  default: vi.fn(() => ({ name: "autoScroll" })),
}));

vi.mock("embla-carousel-react", () => ({
  default: vi.fn(() => [vi.fn(), undefined]),
}));

import { QuoteSection } from "./QuoteSection";

describe("QuoteSection missing embla callback branch", () => {
  it("renders without a carousel API and still exposes the translated region label", () => {
    renderWithIntl(<QuoteSection quotes={quotesFirst} />);

    expect(screen.getByRole("region", { name: t("quote_aria") })).toBeDefined();
  });
});
