"use client";

import {
    useEffect,
    useLayoutEffect,
    useRef,
} from "react";
import gsap from "gsap";

interface SkillsPanelProps {
    open: boolean;
    onClose: () => void;
}

const SkillsPanel = ({
    open,
    onClose,
}: SkillsPanelProps) => {
    const panelRef = useRef<HTMLElement>(null);
    const backdropRef = useRef<HTMLDivElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const closeTimelineRef = useRef<gsap.core.Timeline | null>(null);

    /*
     * Close with Escape
     */
    useEffect(() => {
        if (!open) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                handleClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    /*
     * Opening animation
     */
    useLayoutEffect(() => {
        if (
            !open ||
            !panelRef.current ||
            !backdropRef.current ||
            !closeButtonRef.current
        ) {
            return;
        }

        const panel = panelRef.current;
        const backdrop = backdropRef.current;
        const closeButton = closeButtonRef.current;

        const categories = panel.querySelectorAll(
            ".skills-category"
        );

        const technologies = panel.querySelectorAll(
            ".skills-technologies"
        );

        const ctx = gsap.context(() => {
            gsap.set(backdrop, {
                opacity: 0,
            });

            gsap.set(panel, {
                xPercent: 100,
            });

            gsap.set(closeButton, {
                opacity: 0,
            });

            gsap.set(categories, {
                opacity: 0,
                y: 15,
            });

            gsap.set(technologies, {
                opacity: 0,
                y: 15,
            });

            const timeline = gsap.timeline();

            timeline
                .to(backdrop, {
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out",
                })
                .to(
                    panel,
                    {
                        xPercent: 0,
                        duration: 0.7,
                        ease: "power4.out",
                    },
                    "-=0.25"
                )
                .to(
                    closeButton,
                    {
                        opacity: 1,
                        duration: 0.3,
                        ease: "power2.out",
                    },
                    "-=0.3"
                )
                .to(
                    categories,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.45,
                        stagger: 0.08,
                        ease: "power3.out",
                    },
                    "-=0.15"
                )
                .to(
                    technologies,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.45,
                        stagger: 0.06,
                        ease: "power3.out",
                    },
                    "-=0.3"
                );
        }, panelRef);

        return () => {
            ctx.revert();
        };
    }, [open]);

    /*
     * Closing animation
     */
    const handleClose = () => {
        if (
            !panelRef.current ||
            !backdropRef.current ||
            !closeButtonRef.current
        ) {
            onClose();
            return;
        }

        // Prevent duplicate closing animations
        if (closeTimelineRef.current?.isActive()) {
            return;
        }

        const panel = panelRef.current;
        const backdrop = backdropRef.current;
        const closeButton = closeButtonRef.current;

        const categories = panel.querySelectorAll(
            ".skills-category"
        );

        const technologies = panel.querySelectorAll(
            ".skills-technologies"
        );

        const timeline = gsap.timeline({
            onComplete: () => {
                closeTimelineRef.current = null;
                onClose();
            },
        });

        closeTimelineRef.current = timeline;

        timeline
            .to(
                [
                    categories,
                    technologies,
                    closeButton,
                ],
                {
                    opacity: 0,
                    y: -8,
                    duration: 0.2,
                    stagger: 0.02,
                    ease: "power2.in",
                }
            )
            .to(
                panel,
                {
                    xPercent: 100,
                    duration: 0.55,
                    ease: "power3.inOut",
                },
                "-=0.05"
            )
            .to(
                backdrop,
                {
                    opacity: 0,
                    duration: 0.4,
                    ease: "power2.inOut",
                },
                "-=0.35"
            );
    };

    if (!open) {
        return null;
    }

    return (
        <div
            className="fixed inset-0 z-[100]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="skills-title"
        >
            {/* Backdrop */}
            <div
                ref={backdropRef}
                aria-hidden="true"
                onClick={handleClose}
                className="absolute inset-0 bg-black/10"
            />

            {/* Panel */}
            <aside
                ref={panelRef}
                className="absolute right-0 top-0 z-10 flex h-full w-full max-w-xl flex-col overflow-hidden bg-black px-6 py-6 text-white md:px-8 md:py-8"
            >
                {/* Header */}
                <div className="flex shrink-0 items-center justify-between">
                    <span
                        id="skills-title"
                        className="text-[11px] uppercase tracking-[0.12em]"
                    >
                        Skills
                    </span>

                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={handleClose}
                        aria-label="Close skills panel"
                        className="skills-close text-[11px] uppercase tracking-[0.12em]"
                    >
                        Close
                    </button>
                </div>

                {/* Skills */}
                <div className="min-h-0 flex-1 overflow-y-auto">
                    <div className="my-auto">

                        {/* Development */}
                        <div className="skills-category border-t border-white/20 py-8">
                            <span className="mb-5 block text-[11px] uppercase tracking-[0.12em] text-white/50">
                                Development
                            </span>

                            <div className="skills-technologies font-instrument text-4xl leading-none tracking-[-0.03em] md:text-5xl">
                                <p>Java</p>
                                <p>Spring Boot</p>
                                <p>React</p>
                                <p>Next.js</p>
                                <p>TypeScript</p>
                            </div>
                        </div>

                        {/* Frontend */}
                        <div className="skills-category border-t border-white/20 py-8">
                            <span className="mb-5 block text-[11px] uppercase tracking-[0.12em] text-white/50">
                                Frontend
                            </span>

                            <p className="skills-technologies text-sm uppercase tracking-[0.08em]">
                                HTML · CSS · JavaScript · Tailwind
                            </p>
                        </div>

                        {/* Databases */}
                        <div className="skills-category border-t border-white/20 py-8">
                            <span className="mb-5 block text-[11px] uppercase tracking-[0.12em] text-white/50">
                                Databases
                            </span>

                            <p className="skills-technologies text-sm uppercase tracking-[0.08em]">
                                MySQL · MariaDB
                            </p>
                        </div>

                        {/* Tools */}
                        <div className="skills-category border-t border-white/20 py-8">
                            <span className="mb-5 block text-[11px] uppercase tracking-[0.12em] text-white/50">
                                Tools
                            </span>

                            <p className="skills-technologies text-sm uppercase tracking-[0.08em]">
                                Git · GitHub · VS Code · IntelliJ
                            </p>
                        </div>

                    </div>
                </div>
            </aside>
        </div>
    );
};

export default SkillsPanel;