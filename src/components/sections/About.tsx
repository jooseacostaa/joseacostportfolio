"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import SkillsPanel from "./SkillsPanel";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const [skillsOpen, setSkillsOpen] = useState(false);

    const aboutRef = useRef<HTMLElement | null>(null);
    const titleRef = useRef<HTMLDivElement | null>(null);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const infoRef = useRef<HTMLDivElement | null>(null);
    const actionsRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const about = aboutRef.current;
            const title = titleRef.current;
            const content = contentRef.current;
            const info = infoRef.current;
            const actions = actionsRef.current;

            if (!about || !title || !content || !info || !actions) return;

            const buttons = actions.querySelectorAll(
                ".about-action"
            );

            const details = info.querySelectorAll(
                ".about-detail"
            );

            // -------------------------
            // Initial states
            // -------------------------

            gsap.set(title, {
                opacity: 0,
                y: 100,
                scale: 0.6,
            });

            gsap.set(content, {
                opacity: 0,
                y: 80,
                scale: 0.8,
            });

            gsap.set(details, {
                opacity: 0,
                y: 25,
            });

            gsap.set(buttons, {
                opacity: 0,
                y: 50,
                scale: 0.7,
                delay: 0.1,
            });

            // -------------------------
            // Intro animation
            // -------------------------

            const intro = gsap.timeline({
                scrollTrigger: {
                    trigger: about,
                    start: "top 60%",
                    once: true,
                },
            });

            intro
                .to(title, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 1.3,
                    ease: "power3.out",
                })
                .to(
                    content,
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 1.1,
                        ease: "power3.out",
                    },
                    "-=0.65"
                )
                .to(
                    details,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        stagger: 0.12,
                        ease: "power3.out",
                    },
                    "-=0.45"
                )
                .to(
                    buttons,
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        stagger: 0.08,
                        ease: "power3.out",
                    },
                    "-=0.4"
                );

            // -------------------------
            // Exit animation
            // -------------------------

            gsap.to(content, {
                y: -120,
                scale: 0.82,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: about,
                    start: "45% top",
                    end: "100% top",
                    scrub: 1,
                },
            });

            gsap.to(title, {
                y: -180,
                scale: 0.75,
                opacity: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: about,
                    start: "35% top",
                    end: "100% top",
                    scrub: 1,
                },
            });
        }, aboutRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={aboutRef}
            id="about"
            className="px-6 py-24 md:px-8 md:py-20"
        >
            {/* Header */}
            <div
                ref={titleRef}
                className="mb-20 flex items-end justify-between"
            >
                <h2 className="font-instrument text-6xl tracking-[-0.04em] md:text-9xl">
                    About
                </h2>

                <span className="text-[11px] uppercase tracking-[0.12em]">
                    About me
                </span>
            </div>

            {/* Content */}
            <div
                ref={contentRef}
                className="grid gap-16 px-4 md:grid-cols-[1fr_280px] md:px-16"
            >
                {/* Information */}
                <div
                    ref={infoRef}
                    className="flex flex-col justify-between"
                >
                    <p className="font-instrument max-w-4xl text-4xl leading-[0.95] tracking-[-0.035em] md:text-6xl">
                        I'm José, a software developer based in Spain. I
                        build digital experiences through code, design and
                        interaction, bringing together technology, curiosity
                        and attention to detail.
                    </p>

                    <div className="mt-16 flex gap-16 md:mt-24">
                        <div className="about-detail">
                            <span className="mb-2 block text-[11px] uppercase tracking-[0.12em]">
                                Based in
                            </span>

                            <p className="text-xs uppercase tracking-[0.08em]">
                                Spain
                            </p>
                        </div>

                        <div className="about-detail">
                            <span className="mb-2 block text-[11px] uppercase tracking-[0.12em]">
                                Role
                            </span>

                            <p className="text-xs uppercase tracking-[0.08em]">
                                Software Developer
                            </p>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div
                    ref={actionsRef}
                    className="flex flex-col gap-3 md:pt-1"
                >
                    <a
                        href="mailto:joseacostanaranjo@hotmail.com"
                        className="about-action flex h-14 items-center justify-between bg-black px-6 text-[11px] uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-transparent hover:text-black"
                    >
                        <span>Mail me</span>
                        <span>↗</span>
                    </a>

                    <a
                        href="tel:+34620463759"
                        className="about-action flex h-14 items-center justify-between bg-black px-6 text-[11px] uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-transparent hover:text-black"
                    >
                        <span>Call me</span>
                        <span>↗</span>
                    </a>

                    <a
                        href="https://wa.me/34620463759"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="about-action flex h-14 items-center justify-between bg-black px-6 text-[11px] uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-transparent hover:text-black"
                    >
                        <span>WhatsApp</span>
                        <span>↗</span>
                    </a>

                    <button
                        type="button"
                        onClick={() => setSkillsOpen(true)}
                        className="about-action mt-2 flex h-24 items-center justify-between bg-black px-6 text-[11px] uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-transparent hover:text-black"
                    >
                        <span>Skills</span>
                        <span className="text-lg">↗</span>
                    </button>
                </div>
            </div>

            {/* Skills Panel */}
            <SkillsPanel
                open={skillsOpen}
                onClose={() => setSkillsOpen(false)}
            />
        </section>
    );
};

export default About;