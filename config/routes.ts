import type { Route } from "next";

export const NAV_ROUTES = {
  home: "/",
  contacts: "/contacts",
  about: "/about",
  apartments: "/apartments",
  uiKit: "/ui-kit",
} satisfies Record<string, Route>;

export const ROUTES = {
  ...NAV_ROUTES,
} satisfies Record<string, Route>;
