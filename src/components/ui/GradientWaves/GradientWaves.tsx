"use client";

import type { GradientWavesProps } from "./types";
import { useGradientWaves } from "./useGradientWaves";
import "./GradientWaves.css";

export type { GradientWavesProps, GradientWavesDetail } from "./types";

export default function GradientWaves(props: GradientWavesProps) {
    const containerRef = useGradientWaves(props);
    return (
        <div
            ref={containerRef}
            className={`gradient-waves-container ${props.className ?? ""}`.trim()}
        />
    );
}
