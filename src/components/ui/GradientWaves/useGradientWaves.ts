"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle } from "ogl";
import type { GradientWavesProps } from "./types";
import { hexToRgb, detailToSteps } from "./utils";
import { vertex, fragment } from "./shaders";

type GradientWavesCtx = {
    renderer: InstanceType<typeof Renderer>;
    program: InstanceType<typeof Program>;
    mesh: InstanceType<typeof Mesh>;
};

const ctxMap =
    new WeakMap<HTMLDivElement, GradientWavesCtx>();

export function useGradientWaves({
    horizonColor = "#5227FF",
    waveColor = "#FF9FFC",
    crestColor = "#FFFFFF",
    speed = 0.4,
    amplitude = 2.5,
    waveScale = 0.6,
    waveRatio = 0.9,
    swell = 35,
    turbulence = 20,
    tilt = 1.11,
    zoom = 1.0,
    height = 5.5,
    fogDepth = 15,
    detail = "medium",
    brightness = 1.0,
    opacity = 1.0,
    mouseInteraction = true,
    parallaxStrength = 0.5,
    grain = true,
    grainIntensity = 0.05,
}: GradientWavesProps) {
    const containerRef =
        useRef<HTMLDivElement | null>(null);

    const enableMouseRef =
        useRef(mouseInteraction);

    // Create the renderer once; the following effect updates its uniforms.
    const initialConfig = useRef({
        horizonColor, waveColor, crestColor, speed, amplitude, waveScale,
        waveRatio, swell, turbulence, tilt, zoom, height, fogDepth, detail,
        brightness, opacity, mouseInteraction, parallaxStrength, grain,
        grainIntensity,
    });

    useEffect(() => {
        const {
            horizonColor, waveColor, crestColor, speed, amplitude, waveScale,
            waveRatio, swell, turbulence, tilt, zoom, height, fogDepth, detail,
            brightness, opacity, mouseInteraction, parallaxStrength, grain,
            grainIntensity,
        } = initialConfig.current;

        const container =
            containerRef.current;

        if (!container) return;

        const renderer =
            new Renderer({
                webgl: 2,
                alpha: true,
                premultipliedAlpha: true,
                antialias: false,
                dpr: Math.min(
                    window.devicePixelRatio || 1,
                    2
                ),
            });

        const gl = renderer.gl;

        gl.clearColor(
            0,
            0,
            0,
            0
        );

        const canvas =
            gl.canvas as HTMLCanvasElement;

        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.display = "block";

        container.appendChild(canvas);

        const geometry =
            new Triangle(gl);

        const program =
            new Program(gl, {
                vertex,
                fragment,

                uniforms: {
                    iTime: {
                        value: 0,
                    },

                    iResolution: {
                        value:
                            new Float32Array([1, 1]),
                    },

                    uSpeed: {
                        value: speed,
                    },

                    uAmplitude: {
                        value: amplitude,
                    },

                    uWaveScale: {
                        value: waveScale,
                    },

                    uWaveRatio: {
                        value: waveRatio,
                    },

                    uSwell: {
                        value: swell,
                    },

                    uTurbulence: {
                        value: turbulence,
                    },

                    uTilt: {
                        value: tilt,
                    },

                    uZoom: {
                        value: zoom,
                    },

                    uHeight: {
                        value: height,
                    },

                    uFogDepth: {
                        value: fogDepth,
                    },

                    uSteps: {
                        value:
                            detailToSteps(detail),
                    },

                    uBrightness: {
                        value: brightness,
                    },

                    uOpacity: {
                        value: opacity,
                    },

                    uGrain: {
                        value: grain ? 1 : 0,
                    },

                    uGrainIntensity: {
                        value: grainIntensity,
                    },

                    uMouse: {
                        value:
                            new Float32Array([
                                0.5,
                                0.5,
                            ]),
                    },

                    uParallax: {
                        value: parallaxStrength,
                    },

                    uEnableMouse: {
                        value: mouseInteraction,
                    },

                    uHorizonColor: {
                        value:
                            new Float32Array(
                                hexToRgb(horizonColor)
                            ),
                    },

                    uWaveColor: {
                        value:
                            new Float32Array(
                                hexToRgb(waveColor)
                            ),
                    },

                    uCrestColor: {
                        value:
                            new Float32Array(
                                hexToRgb(crestColor)
                            ),
                    },
                },
            });

        const mesh =
            new Mesh(gl, {
                geometry,
                program,
            });

        ctxMap.set(
            container,
            {
                renderer,
                program,
                mesh,
            }
        );

        const setSize = () => {

            const rect =
                container.getBoundingClientRect();

            const width =
                Math.max(
                    1,
                    Math.floor(rect.width)
                );

            const height =
                Math.max(
                    1,
                    Math.floor(rect.height)
                );

            renderer.setSize(
                width,
                height
            );

            const res =
                (
                    program.uniforms
                        .iResolution as {
                            value: Float32Array;
                        }
                ).value;

            res[0] =
                gl.drawingBufferWidth;

            res[1] =
                gl.drawingBufferHeight;

            renderer.render({
                scene: mesh,
            });
        };

        const resizeObserver =
            new ResizeObserver(
                setSize
            );

        resizeObserver.observe(
            container
        );

        setSize();

        const currentMouse: [
            number,
            number
        ] = [0.5, 0.5];

        const targetMouse: [
            number,
            number
        ] = [0.5, 0.5];

        const onPointerMove = (
            event: PointerEvent
        ) => {

            const rect =
                canvas.getBoundingClientRect();

            targetMouse[0] =
                (event.clientX - rect.left) /
                rect.width;

            targetMouse[1] =
                1 -
                (event.clientY - rect.top) /
                rect.height;
        };

        const onPointerLeave = () => {
            targetMouse[0] = 0.5;
            targetMouse[1] = 0.5;
        };

        canvas.addEventListener(
            "pointermove",
            onPointerMove
        );

        canvas.addEventListener(
            "pointerleave",
            onPointerLeave
        );

        let animationFrame = 0;

        let isVisible = true;

        let isPageVisible =
            !document.hidden;

        const startTime =
            performance.now();

        const render = (
            time: number
        ) => {

            (
                program.uniforms
                    .iTime as {
                        value: number;
                    }
            ).value =
                (time - startTime) *
                0.001;

            const targetX =
                enableMouseRef.current
                    ? targetMouse[0]
                    : 0.5;

            const targetY =
                enableMouseRef.current
                    ? targetMouse[1]
                    : 0.5;

            currentMouse[0] +=
                0.05 *
                (targetX - currentMouse[0]);

            currentMouse[1] +=
                0.05 *
                (targetY - currentMouse[1]);

            const mouse =
                (
                    program.uniforms
                        .uMouse as {
                            value: Float32Array;
                        }
                ).value;

            mouse[0] =
                currentMouse[0];

            mouse[1] =
                currentMouse[1];

            renderer.render({
                scene: mesh,
            });

            animationFrame =
                requestAnimationFrame(
                    render
                );
        };

        const start = () => {

            if (
                isVisible &&
                isPageVisible &&
                animationFrame === 0
            ) {
                animationFrame =
                    requestAnimationFrame(
                        render
                    );
            }
        };

        const stop = () => {

            if (animationFrame !== 0) {

                cancelAnimationFrame(
                    animationFrame
                );

                animationFrame = 0;
            }
        };

        const intersectionObserver =
            new IntersectionObserver(
                ([entry]) => {

                    isVisible =
                        entry.isIntersecting;

                    if (isVisible) {
                        start();
                    } else {
                        stop();
                    }
                },
                {
                    threshold: 0,
                }
            );

        intersectionObserver.observe(
            container
        );

        const onVisibilityChange = () => {

            isPageVisible =
                !document.hidden;

            if (isPageVisible) {
                start();
            } else {
                stop();
            }
        };

        document.addEventListener(
            "visibilitychange",
            onVisibilityChange
        );

        start();

        return () => {

            stop();

            resizeObserver.disconnect();

            intersectionObserver.disconnect();

            document.removeEventListener(
                "visibilitychange",
                onVisibilityChange
            );

            canvas.removeEventListener(
                "pointermove",
                onPointerMove
            );

            canvas.removeEventListener(
                "pointerleave",
                onPointerLeave
            );

            ctxMap.delete(container);

            try {
                container.removeChild(canvas);
            } catch { }

            gl
                .getExtension(
                    "WEBGL_lose_context"
                )
                ?.loseContext();
        };

    }, []);

    useEffect(() => {

        const container =
            containerRef.current;

        if (!container) return;

        const ctx =
            ctxMap.get(container);

        if (!ctx) return;

        const { program } = ctx;

        const uniforms =
            program.uniforms as Record<
                string,
                { value: number | boolean | Float32Array }
            >;

        enableMouseRef.current =
            mouseInteraction;

        uniforms.uSpeed.value =
            speed;

        uniforms.uAmplitude.value =
            amplitude;

        uniforms.uWaveScale.value =
            waveScale;

        uniforms.uWaveRatio.value =
            waveRatio;

        uniforms.uSwell.value =
            swell;

        uniforms.uTurbulence.value =
            turbulence;

        uniforms.uTilt.value =
            tilt;

        uniforms.uZoom.value =
            zoom;

        uniforms.uHeight.value =
            height;

        uniforms.uFogDepth.value =
            fogDepth;

        uniforms.uSteps.value =
            detailToSteps(detail);

        uniforms.uBrightness.value =
            brightness;

        uniforms.uOpacity.value =
            opacity;

        uniforms.uGrain.value =
            grain ? 1 : 0;

        uniforms.uGrainIntensity.value =
            grainIntensity;

        uniforms.uParallax.value =
            parallaxStrength;

        uniforms.uEnableMouse.value =
            mouseInteraction;

        const horizon =
            uniforms.uHorizonColor
                .value as Float32Array;

        const wave =
            uniforms.uWaveColor
                .value as Float32Array;

        const crest =
            uniforms.uCrestColor
                .value as Float32Array;

        const horizonRgb =
            hexToRgb(horizonColor);

        const waveRgb =
            hexToRgb(waveColor);

        const crestRgb =
            hexToRgb(crestColor);

        horizon.set(horizonRgb);
        wave.set(waveRgb);
        crest.set(crestRgb);

    }, [
        horizonColor,
        waveColor,
        crestColor,
        speed,
        amplitude,
        waveScale,
        waveRatio,
        swell,
        turbulence,
        tilt,
        zoom,
        height,
        fogDepth,
        detail,
        brightness,
        opacity,
        grain,
        grainIntensity,
        mouseInteraction,
        parallaxStrength,
    ]);

    return containerRef;
}
