"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

const PageTransition = () => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (!overlayRef.current) return;

        gsap.set(overlayRef.current, {
            scaleY: 1,
            transformOrigin: "top",
        });

        gsap.to(overlayRef.current, {
            scaleY: 0,
            duration: 0.7,
            ease: "power4.inOut",
        });
    }, [pathname]);

    return (
        <div
            ref={overlayRef}
            className="pointer-events-none fixed inset-0 z-[999] origin-top bg-black"
        />
    );
};

export default PageTransition;