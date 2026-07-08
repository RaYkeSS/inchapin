import type { Metadata } from "next";
import Link from "next/link";

import Underline from "~/components/icons/underline";
import { Text } from "~/components/ui/text";

import { APARTMENTS } from "~/data/apartments";

import styles from "./apartments.module.scss";

export const metadata: Metadata = {
  title: "Квартиры",
  description: "Выберите квартиру в доме бизнес-класса INCHAPIN",
};

export default function ApartmentsPage() {
  return (
    <div className={styles.apartmentsPage}>
      <header className={`${styles.header} fadeInUp`}>
        <div className={styles.eyebrow}>
          <Underline color="var(--brand)" size={32} />
          <Text as="span" size="description" className={styles.eyebrowText}>
            Жилая недвижимость
          </Text>
        </div>
        <Text as="h1" size="tagline" className={styles.title}>
          Квартиры
        </Text>
      </header>

      <ul className={styles.grid}>
        {APARTMENTS.map((apt, i) => (
          <li key={apt.slug} className={`fadeInUp delay${(i % 3) + 1}`}>
            <Link href={apt.href} className={styles.card}>
              <div className={styles.cardHead}>
                <Text as="h2" size="caption" className={styles.cardTitle}>
                  {apt.label}
                </Text>
                <Text as="span" size="description" className={styles.cardIndex}>
                  0{i + 1}
                </Text>
              </div>
              <Text as="p" size="paragraph" className={styles.cardDesc}>
                {apt.description}
              </Text>
              <span className={styles.cardLink}>
                Подробнее <span aria-hidden>→</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
