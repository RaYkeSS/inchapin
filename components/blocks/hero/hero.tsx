import { getImageProps } from "next/image";

import CompanySvg from "~/components/icons/company-svg";
import { Text } from "~/components/ui/text";

import { HOME } from "~/data/home";

import styles from "./hero.module.scss";

export function Hero() {
  const common = { alt: "hero", quality: 90, sizes: "100vw" };

  const {
    props: { srcSet: desktop },
  } = getImageProps({
    ...common,
    src: "/images/hero-pc.webp",
    width: 1760,
    height: 600,
  });

  const {
    props: { srcSet: mobile, ...rest },
  } = getImageProps({
    ...common,
    src: "/images/hero-mob.webp",
    width: 640,
    height: 626,
    loading: "eager",
    fetchPriority: "high",
  });

  return (
    <div className={styles.heroBlock}>
      <picture className={`${styles.heroBlockPic} fadeInUp`}>
        <source media="(min-width: 768px)" srcSet={desktop} />
        <source media="(max-width: 767px)" srcSet={mobile} />
        <img {...rest} alt="hero" className={styles.heroBlockImg} />
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
