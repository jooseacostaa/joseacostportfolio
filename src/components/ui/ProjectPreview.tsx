"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

interface ProjectPreviewProps {
    image: string;
    visible: boolean;
    x: number;
    y: number;
}

const ProjectPreview = ({
    image,
    visible,
    x,
    y,
}: ProjectPreviewProps) => {
    const previewRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!previewRef.current) return;

        if (visible) {
            gsap.to(previewRef.current, {
                opacity: 1,
                scale: 2.8,
                duration: 0.5,
                ease: "power3.out",
            });
        } else {
            gsap.to(previewRef.current, {
                opacity: 0,
                scale: 0.95,
                duration: 0.2,
                ease: "power2.inOut",
            });
        }
    }, [visible]);

    useEffect(() => {
        if (!previewRef.current || !visible) return;

        gsap.to(previewRef.current, {
            x,
            y,
            duration: 0.5,
            ease: "power3.out",
        });
    }, [x, y, visible]);

    return (
        <div
            ref={previewRef}
            className="pointer-events-none fixed left-0 top-0 z-50 hidden w-[320px] -translate-x-1/2 -translate-y-1/2 opacity-0 md:block"
        >
            <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                    src={image}
                    alt=""
                    fill
                    sizes="1200px"
                    className="object-cover"
                />
            </div>
        </div>
    );
};

export default ProjectPreview;