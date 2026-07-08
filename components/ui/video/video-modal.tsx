"use client";

import { useCallback, useEffect, useRef } from "react";

import type { VideoModalProps } from "./types";
import styles from "./video-modal.module.scss";

export type { VideoModalProps } from "./types";

interface WebKitDocumentFullscreen {
  webkitFullscreenEnabled?: boolean;
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void>;
}
interface WebKitElementFullscreen {
  webkitRequestFullscreen?: () => Promise<void>;
}

const isFullscreenSupported = (): boolean => {
  if (typeof document === "undefined") return false;
  if (document.fullscreenEnabled) return true;
  const doc = document as WebKitDocumentFullscreen;
  return !!doc.webkitFullscreenEnabled;
};

const requestFullscreen = (el: HTMLElement): Promise<void> => {
  const webkitEl = el as HTMLElement & WebKitElementFullscreen;
  if (el.requestFullscreen) return el.requestFullscreen();
  if (webkitEl.webkitRequestFullscreen)
    return webkitEl.webkitRequestFullscreen();
  return Promise.resolve();
};

const exitFullscreen = (): Promise<void> => {
  if (document.exitFullscreen) return document.exitFullscreen();
  const doc = document as WebKitDocumentFullscreen;
  if (doc.webkitExitFullscreen) return doc.webkitExitFullscreen();
  return Promise.resolve();
};

const readFullscreenElement = (): Element | null | undefined => {
  if (document.fullscreenElement) return document.fullscreenElement;
  const doc = document as WebKitDocumentFullscreen;
  return doc.webkitFullscreenElement;
};

export function VideoModal({ isOpen, onClose, src }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(async () => {
    if (readFullscreenElement()) {
      await exitFullscreen().catch(() => {});
    }
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const handleFullscreenChange = () => {
      if (!readFullscreenElement()) {
        onClose();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);

    if (isFullscreenSupported()) {
      requestFullscreen(containerRef.current).catch(() => {});
    }

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange,
      );
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isOpen) return;

    if (isOpen) {
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.fullscreenContainer} ref={containerRef}>
      <button
        className={styles.closeButton}
        onClick={closeModal}
        aria-label="Закрыть"
      >
        ✕
      </button>

      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          className={styles.video}
          autoPlay
          controls
          playsInline
          poster="/images/video-preview.webp"
        >
          <source src={src} type="video/mp4" />
          Ваш браузер не поддерживает видео.
        </video>
      </div>
    </div>
  );
}
