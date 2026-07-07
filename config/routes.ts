import type { Route } from "next";

export const NAV_ROUTES = {
  contacts: "/contacts",
  about: "/about",
  uiKit: "/ui-kit",
} satisfies Record<string, Route>;

export const ROUTES = {
  home: "/",
  ...NAV_ROUTES,
} satisfies Record<string, Route>;
