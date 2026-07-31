"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/atoms/Button/Button";
import { LinkButton } from "@/components/atoms/Button/LinkButton";
import { NavLink } from "@/components/atoms/NavLink/NavLink";

export type MobileNavigationItem = {
  href: string;
  label: string;
  linkButton?: boolean;
};

type MobileNavigationProps = {
  ariaLabel: string;
  closeLabel: string;
  items: MobileNavigationItem[];
  openLabel: string;
};

export function MobileNavigation({
  ariaLabel,
  closeLabel,
  items,
  openLabel,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden" data-testid="mobile-navigation">
      <Button
        aria-controls="mobile-navigation-panel"
        aria-expanded={isOpen}
        aria-label={isOpen ? closeLabel : openLabel}
        className="h-12! w-12!"
        data-testid="mobile-navigation-toggle"
        isSquare
        onClick={() => setIsOpen((currentState) => !currentState)}
      >
        <span aria-hidden="true" className="relative block h-4 w-5">
          <span
            className={`absolute left-0 h-px w-5 bg-current transition-all duration-200 ${isOpen ? "top-1.5 rotate-45" : "top-0"}`}
          />
          <span
            className={`absolute top-1.5 left-0 h-px w-5 bg-current transition-opacity duration-200 ${isOpen ? "opacity-0" : "opacity-100"}`}
          />
          <span
            className={`absolute left-0 h-px w-5 bg-current transition-all duration-200 ${isOpen ? "top-1.5 -rotate-45" : "top-3"}`}
          />
        </span>
      </Button>

      {isOpen ? (
        <div
          className="fixed top-21 right-4 left-4 z-30 border border-neutral-700 bg-neutral-hover/96 p-5 shadow-2xl backdrop-blur-md sm:right-6 sm:left-6"
          data-testid="mobile-navigation-panel"
        >
          <nav aria-label={ariaLabel}>
            <ul className="flex flex-col items-stretch gap-4">
              {items.map(({ href, label, linkButton }) => (
                <li key={href}>
                  {linkButton ? (
                    <LinkButton
                      href={href}
                      size={14}
                      className="w-full"
                      onClick={() => setIsOpen(false)}
                    >
                      {label}
                    </LinkButton>
                  ) : (
                    <NavLink
                      href={href}
                      className="inline-flex w-full justify-start"
                      onClick={() => setIsOpen(false)}
                    >
                      {label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
