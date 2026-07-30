import { getAnchorHref } from "./getAnchorHref";

describe("getAnchorHref", () => {
  it("prefixes translated section slugs with /#", () => {
    expect(getAnchorHref("jakpracuje")).toBe("/#jakpracuje");
    expect(getAnchorHref("corobie")).toBe("/#corobie");
  });
});
