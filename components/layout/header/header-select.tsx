"use client";

import { usePathname, useRouter } from "next/navigation";

import { Select } from "~/components/ui/select";

import { UI } from "~/data/ui";

const OPTIONS = UI.header.apartments;
type ApartmentOption = (typeof OPTIONS)[number];

function detectApartment(
  pathname: string,
  options: ApartmentOption[],
): ApartmentOption | null {
  const match = pathname.match(/\/apartments\/([^/]+)/);
  if (!match) return null;
  const slug = match[1];
  return options.find((o) => o.value === slug) ?? null;
}

interface HeaderSelectProps {
  className?: string;
}

export function HeaderSelect({ className }: HeaderSelectProps) {
  const pathname = usePathname();
  const router = useRouter();
  const value = detectApartment(pathname, OPTIONS);

  return (
    <Select<ApartmentOption>
      className={className}
      aria-label={UI.header.selectAriaLabel}
      options={OPTIONS}
      value={value}
      placeholder={UI.header.selectPlaceholder}
      onChange={(option) => {
        if (option?.href) router.push(option.href);
      }}
    />
  );
}
