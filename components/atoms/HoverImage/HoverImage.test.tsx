import { render, screen } from "@testing-library/react";
import { HoverImage } from "./HoverImage";

describe("HoverImage", () => {
  it("renders base and hover image variants", () => {
    render(
      <HoverImage
        alt="Opis obrazka"
        src="/base.webp"
        hoverSrc="/hover.webp"
        sizes="100vw"
        isLoadingEager
      />,
    );

    expect(screen.getByTestId("hover-image")).toBeDefined();
    expect(screen.getByAltText("Opis obrazka")).toBeDefined();
    expect(screen.getByTestId("hover-image-base").getAttribute("loading")).toBe(
      "eager",
    );
    expect(
      decodeURIComponent(
        screen.getByTestId("hover-image-hover").getAttribute("src") ?? "",
      ),
    ).toContain("/hover.webp");
    expect(screen.getByTestId("hover-image-hover").getAttribute("alt")).toBe(
      "",
    );
  });

  it("does not render hover image when hoverSrc is missing", () => {
    render(<HoverImage alt="Opis obrazka" src="/base.webp" sizes="100vw" />);

    expect(screen.queryByTestId("hover-image-hover")).toBeNull();
  });
});
