"use client";

import { useEffect, useRef, useState } from "react";
import type WaveSurfer from "wavesurfer.js";
import { Heading } from "@/components/atoms/Heading/Heading";
import { Text } from "@/components/atoms/Text/Text";
import { Button } from "@/components/atoms/Button/Button";
import { useAppTranslations } from "@/i18n/translations";
import Play from "@/public/play.svg";
import Pause from "@/public/pause.svg";
import { RevealText } from "@/components/atoms/RevealText/RevealText";

export type AudioWavePlayerProps = {
  label: string;
  src: string;
};

function getResolvedThemeColor(variableName: string, fallback: string) {
  if (typeof window === "undefined") {
    return fallback;
  }

  return (
    getComputedStyle(document.documentElement)
      .getPropertyValue(variableName)
      .trim() || fallback
  );
}

function formatDuration(value: number) {
  if (!Number.isFinite(value) || value <= 0) {
    return "00:00";
  }

  const minutes = Math.floor(value / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export function AudioWavePlayer({ label, src }: AudioWavePlayerProps) {
  const t = useAppTranslations();

  const waveformRef = useRef<HTMLDivElement | null>(null);
  const wavesurferRef = useRef<WaveSurfer | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isWaveformReady, setIsWaveformReady] = useState(false);

  useEffect(() => {
    if (!waveformRef.current) return;
    if (
      typeof window === "undefined" ||
      /jsdom/i.test(window.navigator.userAgent)
    ) {
      return;
    }

    let isDisposed = false;
    let currentWaveSurfer: WaveSurfer | null = null;

    async function mountWaveSurfer() {
      const { default: WaveSurfer } = await import("wavesurfer.js");

      if (isDisposed || !waveformRef.current) return;

      const waveColor = getResolvedThemeColor("--color-neutral-400", "#898e8e");
      const progressColor = getResolvedThemeColor(
        "--color-brand-green",
        "#00ff00",
      );

      currentWaveSurfer = WaveSurfer.create({
        container: waveformRef.current,
        url: src,
        height: 46,
        waveColor,
        progressColor,
        cursorColor: "transparent",
        cursorWidth: 0,
        barWidth: 2.33,
        barGap: 2.18,
        barRadius: 100,
        barMinHeight: 5.24,
        normalize: true,
        dragToSeek: true,
      });

      wavesurferRef.current = currentWaveSurfer;

      currentWaveSurfer.on("ready", (nextDuration) => {
        if (isDisposed) return;

        setDuration(nextDuration);
        setIsWaveformReady(true);
      });

      currentWaveSurfer.on("play", () => {
        if (!isDisposed) {
          setIsPlaying(true);
        }
      });

      currentWaveSurfer.on("pause", () => {
        if (!isDisposed) {
          setIsPlaying(false);
        }
      });

      currentWaveSurfer.on("finish", () => {
        if (!isDisposed) {
          setIsPlaying(false);
        }
      });

      currentWaveSurfer.on("error", () => {
        if (!isDisposed) {
          setIsPlaying(false);
          setIsWaveformReady(false);
        }
      });
    }

    void mountWaveSurfer();

    return () => {
      isDisposed = true;
      currentWaveSurfer?.destroy();

      if (wavesurferRef.current === currentWaveSurfer) {
        wavesurferRef.current = null;
      }
    };
  }, [src]);

  const togglePlayback = async () => {
    const wavesurfer = wavesurferRef.current;

    if (!wavesurfer) return;

    try {
      await wavesurfer.playPause();
    } catch {
      setIsPlaying(false);
    }
  };

  return (
    <div
      className="flex w-full flex-col gap-5"
      data-testid={`audio-player-${label}`}
    >
      <Heading level="h5" weight={700}>
        <RevealText>{label}</RevealText>
      </Heading>

      <div className="flex w-full items-center gap-6">
        <Button
          aria-label={
            isPlaying
              ? t("before_after_player_pause_aria", { label })
              : t("before_after_player_play_aria", { label })
          }
          className="h-12! w-12! hover:[&_path]:fill-neutral-hover"
          onClick={togglePlayback}
          disabled={!isWaveformReady}
          isSquare
          data-testid="audio-player-toggle"
        >
          {isPlaying ? (
            <Pause aria-hidden="true" />
          ) : (
            <Play aria-hidden="true" />
          )}
        </Button>

        <div
          aria-label={t("before_after_waveform_aria", { label })}
          className="min-h-11.5 w-44.5 flex-1"
          data-testid="audio-player-waveform"
          ref={waveformRef}
          role="img"
        />

        <Text size={16} weight={500}>
          {formatDuration(duration)}
        </Text>
      </div>
    </div>
  );
}
