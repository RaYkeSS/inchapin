import Image from "next/image";

import LogoShort from "~/components/icons/logo-short";
import Underline from "~/components/icons/underline";
import { Text } from "~/components/ui/text";
import { Video } from "~/components/ui/video";

import { HOME } from "~/data/home";

import styles from "./about.module.scss";

export function About() {
  return (
    <div className={styles.aboutBlock}>
      <div className={styles.aboutleft}>
        <Text
          as="h2"
          size="description"
          color="accent"
          className={styles.aboutTitle}
        >
          {HOME.about.title}
        </Text>
        <div className={styles.imgCnt}>
          <Image
            className={styles.img}
            src="/images/about.webp"
            quality={90}
            width={733}
            height={900}
            alt="О проекте INCHAPIN"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzMzIiBoZWlnaHQ9IjkwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNzMzIiBoZWlnaHQ9IjkwMCIgZmlsbD0iI2UwZTBlMCIvPjwvc3ZnPg=="
          />
          <div className={styles.logoShortCnt}>
            <LogoShort className={styles.logoShort} />
          </div>
        </div>
      </div>
      <div className={styles.aboutRight}>
        <div className={styles.aboutAccent}>
          <Underline color="var(--brand)" className={styles.Underline} />
          <Text as="p" size="caption">
            {HOME.about.text1.map((seg, i) => (
              <Text key={i} color={seg.accent ? "accent" : undefined}>
                {seg.text}
              </Text>
            ))}
          </Text>
        </div>
        <Text as="p" size="paragraph">
          {HOME.about.text2.map((seg, i) => (
            <Text key={i} color={seg.accent ? "accent" : undefined}>
              {seg.text}
            </Text>
          ))}
        </Text>
        <Video />
      </div>
    </div>
  );
}
