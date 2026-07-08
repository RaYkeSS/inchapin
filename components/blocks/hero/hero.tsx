import Image from "next/image";

import CompanySvg from "~/components/icons/company-svg";
import { Text } from "~/components/ui/text";

import { HOME } from "~/data/home";

import styles from "./hero.module.scss";

export function Hero() {
  return (
    <div className={styles.heroBlock}>
      <picture className={`${styles.heroBlockPic} fadeInUp`}>
        <source media="(min-width: 768px)" srcSet="/images/hero-pc.webp" />
        <Image
          className={styles.heroBlockImg}
          src="/images/hero-mob.webp"
          width={640}
          height={626}
          preload={true}
          alt="hero"
          quality={90}
          loading="eager"
          sizes="(max-width: 767px) 100vw, 1760px"
        />
      </picture>
      <div className={styles.heroBlockContent}>
        <Text
          as="h1"
          size="tagline"
          color="accent"
          className={`${styles.heroBlockContentTitle} fadeInUp delay2`}
        >
          {HOME.hero.title}
        </Text>
        <CompanySvg
          className={`${styles.heroBlockContentLogo} fadeInUp delay3`}
          color="var(--foreground)"
        />
      </div>
    </div>
  );
}
