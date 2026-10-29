import type { GradientWavesDetail } from "./types";

export const hexToRgb = (hex: string): [number, number, number] => {
    const result =
        /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (!result) return [1, 1, 1];

    return [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255,
    ];
};

export const detailToSteps = (detail: GradientWavesDetail): number => {
    if (detail === "low") return 40;
    if (detail === "high") return 110;

    return 70;
};

