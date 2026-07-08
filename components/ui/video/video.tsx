"use client";

import { useState } from "react";

import Image from "next/image";

import { useVideoMetadata } from "~/lib/useVideoMetadata";

import Play from "~/components/icons/play";
import { Text } from "~/components/ui/text";

import { HOME } from "~/data/home";

import { VideoModal } from "./video-modal";
import styles from "./video.module.scss";

export function Video() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { videoRef, duration } = useVideoMetadata({
    src: "/videos/video.mp4",
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button
        type="button"
        className={styles.VideoBlock}
        onClick={openModal}
        aria-label={`Смотреть ${HOME.video.label.toLowerCase()}`}
      >
        <div className={styles.VideoInfo}>
          <Text as="div" size="videoTitle" className={styles.VideoName}>
            {HOME.video.label}
          </Text>
          <Text as="div" size="videoTime" className={styles.VideoTime}>
            {duration}
          </Text>
        </div>
        <div className={styles.VideoDecor}></div>
        <div className={styles.VideoPreview}>
          <Image
            quality={90}
            className={styles.img}
            src="/images/video-preview.webp"
            width={241}
            height={241}
            alt="Превью видео о проекте"
            sizes="(max-width: 767px) 100vw, 733px"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQxIiBoZWlnaHQ9IjI0MSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjQxIiBoZWlnaHQ9IjI0MSIgZmlsbD0iI2UwZTBlMCIvPjwvc3ZnPg=="
          />
          <div className={styles.VideoPlay}>
            <Play />
            <div>play</div>
          </div>
        </div>
      </button>

      <VideoModal
        isOpen={isModalOpen}
        onClose={closeModal}
        src="/videos/video.mp4"
      />

      <video
        ref={videoRef}
        src="/videos/video.mp4"
        style={{ display: "none" }}
        preload="metadata"
      />
    </>
  );
}
