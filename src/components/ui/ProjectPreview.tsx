"use client";

import Image from "next/image";
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
} from "react";
import gsap from "gsap";

interface ProjectPreviewProps {
    image: string;
    visible: boolean;
    x: number;
    y: number;
}

export interface ProjectPreviewHandle {
    expand: () => Promise<void>;
}

const ProjectPreview = forwardRef<
    ProjectPreviewHandle,
    ProjectPreviewProps
>(({ image, visible, x, y }, ref) => {
    const previewRef = useRef<HTMLDivElement>(null);

    const currentX = useRef(0);
    const currentY = useRef(0);

    useImperativeHandle(ref, () => ({
        expand: () => {
            return new Promise((resolve) => {
                if (!previewRef.current) {
                    resolve();
                    return;
                }

                gsap.to(previewRef.current, {
                    x: window.innerWidth / 2,
                    y: window.innerHeight / 2,
                    width: window.innerWidth,
                    height: window.innerHeight,
                    scale: 1,
                    rotate: 0,
                    duration: 0.8,
                    ease: "power4.inOut",
                    onComplete: resolve,
                });
            });
        },
    }));

    useEffect(() => {
        if (!previewRef.current) return;

        if (visible) {
            gsap.to(previewRef.current, {
                opacity: 1,
                scale: 1,
                rotate: 0,
                duration: 0.45,
                ease: "power3.out",
            });
        } else {
            gsap.to(previewRef.current, {
                opacity: 0,
                scale: 0.92,
                rotate: -3,
                duration: 0.25,
                ease: "power2.inOut",
            });
        }
    }, [visible]);

    useEffect(() => {
        if (!previewRef.current || !visible) return;

        const deltaX = x - currentX.current;

        const rotation = Math.max(
            -4,
            Math.min(4, deltaX * 0.04)
        );

        gsap.to(previewRef.current, {
            x,
            y,
            rotate: rotation,
            duration: 0.6,
            ease: "power3.out",
        });

        currentX.current = x;
        currentY.current = y;
    }, [x, y, visible]);

    return (
        <div
            ref={previewRef}
            id="project-preview"
            className="pointer-events-none fixed left-0 top-0 z-50 hidden w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-0 md:block"
        >
            <div className="relative aspect-[4/3] h-full w-full overflow-hidden">
                <Image
                    src={image}
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover"
                />
            </div>
        </div>
    );
});

ProjectPreview.displayName = "ProjectPreview";

export default ProjectPreview;