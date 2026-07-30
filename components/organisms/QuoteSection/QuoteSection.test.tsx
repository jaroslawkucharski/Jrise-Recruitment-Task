"use client";

import { act, screen } from "@testing-library/react";
import { quotesFirst } from "@/data/quotes";
import { renderWithIntl, t } from "@/utils/renderWithIntl";
import { vi } from "vitest";
import { QuoteSection } from "./QuoteSection";

const emblaMock = vi.hoisted(() => {
  let selectedSnap = 0;
  let withApi = true;
  const listeners = new Map<string, () => void>();

  const play = vi.fn();
  const stop = vi.fn();

  const api = {
    selectedScrollSnap: vi.fn(() => selectedSnap),
    on: vi.fn((event: string, callback: () => void) => {
      listeners.set(event, callback);
      return api;
    }),
    off: vi.fn((event: string) => {
      listeners.delete(event);
      return api;
    }),
    plugins: vi.fn(() => ({
      autoScroll: {
        play,
        stop,
      },
    })),
  };

  return {
    api,
    play,
    stop,
    listeners,
    setSelectedSnap(value: number) {
      selectedSnap = value;
    },
    setWithApi(value: boolean) {
      withApi = value;
    },
    getApi() {
      return withApi ? api : undefined;
    },
    reset() {
      selectedSnap = 0;
      withApi = true;
      listeners.clear();
      play.mockReset();
      stop.mockReset();
      api.selectedScrollSnap.mockClear();
      api.on.mockClear();
      api.off.mockClear();
      api.plugins.mockClear();
    },
  };
});

vi.mock("embla-carousel-auto-scroll", () => ({
  default: vi.fn(() => ({ name: "autoScroll" })),
}));

vi.mock("embla-carousel-react", () => ({
  default: vi.fn(() => [vi.fn(), emblaMock.getApi()]),
}));

describe("QuoteSection", () => {
  beforeEach(() => {
    emblaMock.reset();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
      }),
    });

    Object.defineProperty(window, "requestAnimationFrame", {
      writable: true,
      value: vi.fn((callback: FrameRequestCallback) => {
        callback(0);
        return 7;
      }),
    });

    Object.defineProperty(window, "cancelAnimationFrame", {
      writable: true,
      value: vi.fn(),
    });
  });

  it("renders duplicated quotes and reacts to carousel selection changes", () => {
    const { container, unmount } = renderWithIntl(
      <QuoteSection quotes={quotesFirst} />,
    );

    expect(
      screen.getByRole("region", { name: t("quote_aria") }),
    ).toBeDefined();
    expect(container.querySelectorAll("article")).toHaveLength(6);
    expect(emblaMock.play).toHaveBeenCalledTimes(1);
    expect(emblaMock.stop).not.toHaveBeenCalled();

    emblaMock.setSelectedSnap(4);

    act(() => {
      emblaMock.listeners.get("select")?.();
    });

    expect(emblaMock.api.selectedScrollSnap).toHaveBeenCalled();

    unmount();

    expect(emblaMock.api.off).toHaveBeenCalledWith(
      "select",
      expect.any(Function),
    );
    expect(emblaMock.api.off).toHaveBeenCalledWith(
      "reInit",
      expect.any(Function),
    );
    expect(window.cancelAnimationFrame).toHaveBeenCalledWith(7);
  });

  it("stops auto scroll when reduced motion is preferred", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
      }),
    });

    renderWithIntl(<QuoteSection quotes={quotesFirst} />);

    expect(emblaMock.stop).toHaveBeenCalledTimes(1);
    expect(emblaMock.play).not.toHaveBeenCalled();
  });

  it("renders safely when the carousel API is unavailable", () => {
    emblaMock.setWithApi(false);

    renderWithIntl(<QuoteSection quotes={quotesFirst} />);

    expect(
      screen.getByRole("region", { name: t("quote_aria") }),
    ).toBeDefined();
    expect(emblaMock.play).not.toHaveBeenCalled();
    expect(emblaMock.stop).not.toHaveBeenCalled();
  });
});
