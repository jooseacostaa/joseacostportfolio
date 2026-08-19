"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import gsap from "gsap";

interface TransitionOrigin {
    left: number;
    top: number;
    width: number;
    height: number;
}

interface TransitionRequest {
    href: string;
    image: string;
    origin: TransitionOrigin;
}

interface TransitionState extends TransitionRequest {
    hasNavigated: boolean;
}

const PageTransitionContext = createContext<{
    startProjectTransition: (request: TransitionRequest) => void;
} | null>(null);

export const usePageTransition = () => {
    const context = useContext(PageTransitionContext);

    if (!context) {
        throw new Error("usePageTransition must be used inside PageTransition");
    }

    return context;
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const pathname = usePathname();
    const overlayRef = useRef<HTMLDivElement>(null);
    const [transition, setTransition] = useState<TransitionState | null>(null);

    const startProjectTransition = useCallback((request: TransitionRequest) => {
        if (transition) return;

        setTransition({ ...request, hasNavigated: false });
    }, [transition]);

    useEffect(() => {
        if (!transition || transition.hasNavigated || !overlayRef.current) return;

        const overlay = overlayRef.current;
        const timeline = gsap.timeline({
            onComplete: () => {
                setTransition((current) => current
                    ? { ...current, hasNavigated: true }
                    : null);
                router.push(transition.href);
            },
        });

        timeline.to(overlay, {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight,
            duration: 0.8,
            ease: "power4.inOut",
        });

        return () => {
            timeline.kill();
        };
    }, [router, transition]);

    useEffect(() => {
        if (!transition?.hasNavigated || pathname !== transition.href || !overlayRef.current) return;

        const overlay = overlayRef.current;
        const fade = gsap.to(overlay, {
            opacity: 0,
            duration: 1.2,
            delay: 0.1,
            ease: "power2.inOut",
            onComplete: () => setTransition(null),
        });

        return () => {
            fade.kill();
        };
    }, [pathname, transition]);

    return (
        <PageTransitionContext.Provider value={{ startProjectTransition }}>
            {children}

            {transition && (
                <div
                    ref={overlayRef}
                    className="pointer-events-none fixed z-[100] overflow-hidden"
                    style={{
                        left: transition.origin.left,
                        top: transition.origin.top,
                        width: transition.origin.width,
                        height: transition.origin.height,
                    }}
                >
                    <Image
                        src={transition.image}
                        alt=""
                        fill
                        priority
                        sizes="100vw"
                        className="object-cover"
                    />
                </div>
            )}
        </PageTransitionContext.Provider>
    );
};

export default PageTransition;
