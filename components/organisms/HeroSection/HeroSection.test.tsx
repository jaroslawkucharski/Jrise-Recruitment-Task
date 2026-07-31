import { render, screen } from "@testing-library/react";
import { messages } from "@/i18n/messages";
import { createAppTranslator } from "@/i18n/translations";
import { t } from "@/utils/renderWithIntl";
import { vi } from "vitest";
import { HeroSection } from "./HeroSection";

const translator = createAppTranslator({
  locale: "pl",
  messages,
});

vi.mock("@/i18n/translations", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/i18n/translations")>();

  return {
    ...actual,
    getAppTranslations: async () => translator,
  };
});

vi.mock("@/public/hero.webp", () => ({
  default: {
    src: "/hero.webp",
    width: 1600,
    height: 900,
    blurDataURL:
      "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",
  },
}));

vi.mock("@/public/logo_01.webp", () => ({
  default: { src: "/logo_01.webp", width: 63, height: 32 },
}));

vi.mock("@/public/logo_02.webp", () => ({
  default: { src: "/logo_02.webp", width: 30, height: 32 },
}));

vi.mock("@/public/logo_03.webp", () => ({
  default: { src: "/logo_03.webp", width: 97, height: 32 },
}));

vi.mock("@/public/logo_04.webp", () => ({
  default: { src: "/logo_04.webp", width: 58, height: 32 },
}));

vi.mock("@/public/logo_05.webp", () => ({
  default: { src: "/logo_05.webp", width: 80, height: 32 },
}));

describe("HeroSection", () => {
  it("renders translated copy, contact link and partner logos", async () => {
    const { container } = render(await HeroSection());

    expect(
      screen.getByRole("region", { name: t("home_section_aria") }),
    ).toBeDefined();
    expect(screen.getByRole("heading", { level: 1 })).toBeDefined();
    expect(screen.getByRole("heading", { level: 5 })).toBeDefined();
    expect(screen.getByTestId("hero-cta-link").getAttribute("href")).toBe(
      `/#${t("anchor_contact")}`,
    );
    expect(container.querySelectorAll("img")).toHaveLength(6);
  });
});
