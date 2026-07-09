import type { Route } from "next";

export interface Apartment {
  slug: string;
  label: string;
  title: string;
  description: string;
  href: Route;
}

export function apartmentHref(slug: string): Route {
  return `/apartments/${slug}` as Route;
}

export const APARTMENTS: Apartment[] = [
  {
    slug: "first",
    label: "Квартира 1",
    title: "Квартира 1",
    description: "Просторная квартира с чистовой отделкой",
    href: apartmentHref("first"),
  },
  {
    slug: "second",
    label: "Квартира 2",
    title: "Квартира 2",
    description: "Уютная квартира с панорамными окнами",
    href: apartmentHref("second"),
  },
];

export const APARTMENTS_MAP: Record<string, Apartment | undefined> =
  Object.fromEntries(APARTMENTS.map((apt) => [apt.slug, apt]));

export function getApartment(slug: string): Apartment | undefined {
  return Object.hasOwn(APARTMENTS_MAP, slug) ? APARTMENTS_MAP[slug] : undefined;
}
