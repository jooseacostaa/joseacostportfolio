"use client";

import Image from "next/image";
import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface ProjectPreviewProps {
    image: string;
    visible: boolean;
}

export interface ProjectPreviewHandle {
    getBounds: () => DOMRect | null;
    moveTo: (x: number, y: number) => void;
}

const ProjectPreview = forwardRef<ProjectPreviewHandle, ProjectPreviewProps>(
    ({ image, visible }, ref) => {
        const previewRef = useRef<HTMLDivElement>(null);
        const visualRef = useRef<HTMLDivElement>(null);
        const positionRef = useRef<number | null>(null);
        const motionRef = useRef<{
            x: ReturnType<typeof gsap.quickTo>;
            y: ReturnType<typeof gsap.quickTo>;
            rotate: ReturnType<typeof gsap.quickTo>;
        } | null>(null);

        useLayoutEffect(() => {
            const ctx = gsap.context(() => {
                motionRef.current = {
                    x: gsap.quickTo(previewRef.current, "x", { duration: 0.6, ease: "power3.out" }),
                    y: gsap.quickTo(previewRef.current, "y", { duration: 0.6, ease: "power3.out" }),
                    rotate: gsap.quickTo(visualRef.current, "rotate", { duration: 0.6, ease: "power3.out" }),
                };
            });

            return () => {
                motionRef.current = null;
                positionRef.current = null;
                ctx.revert();
            };
        }, []);

        useImperativeHandle(ref, () => ({
            getBounds: () => {
                const bounds = visualRef.current?.getBoundingClientRect();
                return visible && bounds && bounds.width > 0 && bounds.height > 0 ? bounds : null;
            },
            moveTo: (x, y) => {
                const motion = motionRef.current;
                if (!motion || !previewRef.current) return;

                const previousX = positionRef.current;
                if (previousX === null) {
                    gsap.set(previewRef.current, { x, y });
                } else {
                    motion.x(x);
                    motion.y(y);
                }
                motion.rotate(Math.max(-4, Math.min(4, (x - (previousX ?? x)) * 0.04)));
                positionRef.current = x;
            },
        }), [visible]);

        useEffect(() => {
            const tween = gsap.to(visualRef.current, {
                opacity: visible ? 1 : 0,
                scale: visible ? 1.7 : 0.92,
                duration: visible ? 0.45 : 0.25,
                ease: visible ? "power3.out" : "power2.inOut",
                overwrite: "auto",
            });
            return () => { tween.kill(); };
        }, [visible]);

        return (
            <div
                ref={previewRef}
                aria-hidden="true"
                className="pointer-events-none fixed left-0 top-0 z-50 hidden w-[420px] -translate-x-1/2 -translate-y-1/2 md:block"
            >
                <div ref={visualRef} className="relative aspect-[4/3] w-full overflow-hidden opacity-0">
                    <Image src={image} alt="" fill sizes="714px" className="object-cover" />
                </div>
            </div>
        );
    }
);

ProjectPreview.displayName = "ProjectPreview";
export default ProjectPreview;
