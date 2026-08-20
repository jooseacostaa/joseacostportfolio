"use client";

import { useState } from "react";
import SkillsPanel from "./SkillsPanel";

const About = () => {
    const [skillsOpen, setSkillsOpen] = useState(false);

    return (
        <section
            id="about"
            className="px-6 py-24 md:px-8 md:py-20"
        >
            {/* Header */}
            <div className="mb-20 flex items-end justify-between">
                <h2 className="font-instrument text-6xl tracking-[-0.04em] md:text-9xl">
                    About
                </h2>

                <span className="text-[11px] uppercase tracking-[0.12em]">
                    About me
                </span>
            </div>

            {/* Content */}
            <div className="grid gap-16 px-4 md:grid-cols-[1fr_280px] md:px-16">

                {/* Information */}
                <div className="flex flex-col justify-between">

                    <p className="font-instrument max-w-4xl text-4xl leading-[0.95] tracking-[-0.035em] md:text-6xl">
                        I'm José, a software developer based in Spain. I
                        build digital experiences through code, design and
                        interaction, bringing together technology, curiosity
                        and attention to detail.
                    </p>

                    <div className="mt-16 flex gap-16 md:mt-24">

                        <div>
                            <span className="mb-2 block text-[11px] uppercase tracking-[0.12em]">
                                Based in
                            </span>

                            <p className="text-xs uppercase tracking-[0.08em]">
                                Spain
                            </p>
                        </div>

                        <div>
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
                <div className="flex flex-col gap-3 md:pt-1">

                    <a
                        href="mailto:joseacostanaranjo@hotmail.com"
                        className="flex h-14 items-center justify-between bg-black px-6 text-[11px] uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-transparent hover:text-black"
                    >
                        <span>Mail me</span>
                        <span>↗</span>
                    </a>

                    <a
                        href="tel:+34620463759"
                        className="flex h-14 items-center justify-between bg-black px-6 text-[11px] uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-transparent hover:text-black"
                    >
                        <span>Call me</span>
                        <span>↗</span>
                    </a>

                    <a
                        href="https://wa.me/34620463759"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-14 items-center justify-between bg-black px-6 text-[11px] uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-transparent hover:text-black"
                    >
                        <span>WhatsApp</span>
                        <span>↗</span>
                    </a>

                    <button
                        type="button"
                        onClick={() => setSkillsOpen(true)}
                        className="mt-2 flex h-24 items-center justify-between bg-black px-6 text-[11px] uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-transparent hover:text-black"
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