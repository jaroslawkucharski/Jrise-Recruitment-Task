import { act, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { RevealText } from "./RevealText";

type IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver,
) => void;

const intersectionMock = vi.hoisted(() => {
  let callback: IntersectionObserverCallback | undefined;

  return {
    observe: vi.fn(),
    disconnect: vi.fn(),
    setCallback(nextCallback: IntersectionObserverCallback) {
      callback = nextCallback;
    },
    trigger(isIntersecting: boolean) {
      if (!callback) {
        throw new Error("IntersectionObserver callback was not registered.");
      }

      callback(
        [{ isIntersecting } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    },
    reset() {
      callback = undefined;
      this.observe.mockReset();
      this.disconnect.mockReset();
    },
  };
});

describe("RevealText", () => {
  beforeEach(() => {
    intersectionMock.reset();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockReturnValue({
        matches: false,
      }),
    });

    class MockIntersectionObserver {
      constructor(nextCallback: IntersectionObserverCallback) {
        intersectionMock.setCallback(nextCallback);
      }

      observe = intersectionMock.observe;

      disconnect = intersectionMock.disconnect;
    }

    Object.defineProperty(window, "IntersectionObserver", {
      writable: true,
      value: MockIntersectionObserver,
    });
  });

  it("renders a span by default and updates classes from intersection changes", () => {
    const { unmount } = render(
      <RevealText data-testid="reveal-text">Tekst testowy</RevealText>,
    );

    const element = screen.getByTestId("reveal-text");

    expect(element.tagName).toBe("SPAN");
    expect(element.className).toContain("blur-0");
    expect(element.className).toContain("opacity-100");
    expect(intersectionMock.observe).toHaveBeenCalledTimes(1);

    act(() => {
      intersectionMock.trigger(false);
    });

    expect(element.className).toContain("blur-[2px]");
    expect(element.className).toContain("opacity-45");

    act(() => {
      intersectionMock.trigger(true);
    });

    expect(element.className).toContain("blur-0");
    expect(element.className).toContain("opacity-100");

    unmount();

    expect(intersectionMock.disconnect).toHaveBeenCalledTimes(1);
  });

  it("supports rendering as a div and skips the observer for reduced motion", () => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockReturnValue({
        matches: true,
      }),
    });

    render(
      <RevealText as="div" className="custom-class" data-testid="reveal-block">
        Blok tekstu
      </RevealText>,
    );

    const element = screen.getByTestId("reveal-block");

    expect(element.tagName).toBe("DIV");
    expect(element.className).toContain("custom-class");
    expect(intersectionMock.observe).not.toHaveBeenCalled();
    expect(intersectionMock.disconnect).not.toHaveBeenCalled();
  });
});
