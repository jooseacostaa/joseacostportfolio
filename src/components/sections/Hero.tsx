"use client";

import GradientWaves from "@/components/ui/GradientWaves/GradientWaves";

const Hero = () => {
    return (
        <section className="relative min-h-screen w-full overflow-hidden px-6 py-6 md:px-8 md:py-8">

            {/* Gradient Waves background */}
            <div className="absolute inset-0 z-0">
                <GradientWaves
                    horizonColor="#050505"
                    waveColor="#181818"
                    crestColor="#FFFFFF"
                    speed={0.3}
                    amplitude={2.2}
                    waveScale={0.6}
                    waveRatio={2.5}
                    swell={30}
                    turbulence={35}
                    tilt={1}
                    zoom={1.1}
                    height={7}
                    fogDepth={14}
                    detail="medium"
                    brightness={0.35}
                    opacity={1}
                    mouseInteraction
                    parallaxStrength={0.35}
                    grain={false}
                />
            </div>

            {/* Navigation */}
            <nav className="absolute top-6 left-6 right-6 z-10 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] md:top-8 md:left-8 md:right-8">
                <span>José Acosta</span>

                <div className="flex gap-6">
                    <a href="#work">Work</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </div>
            </nav>

            {/* Main title */}
            <div className="absolute inset-x-0 top-[23%] z-10 flex justify-center pointer-events-none">
                <h1 className="font-instrument text-center text-[clamp(5rem,16vw,16rem)] font-normal leading-[0.75] tracking-[-0.07em]">
                    <span>JOSÉ </span>
                    <span className="italic">ACOSTA</span>
                </h1>
            </div>

            {/* About + social links */}
            <div className="absolute bottom-[15%] left-[10%] z-10 max-w-xl">

                <p className="mb-8 max-w-lg text-xl leading-[1.1] tracking-[-0.02em] md:text-2xl">
                    Hi, I'm José, a software developer based in Spain. I build digital
                    experiences through code, design, and interaction, bringing together
                    a passion for technology, a strong eye for detail, and a curiosity
                    for experimenting with new ideas.
                </p>

                <div className="flex gap-8 text-sm uppercase tracking-[0.12em]">
                    <a
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pointer-events-auto transition-opacity hover:opacity-60"
                    >
                        Instagram
                    </a>

                    <a
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pointer-events-auto transition-opacity hover:opacity-60"
                    >
                        LinkedIn
                    </a>

                    <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pointer-events-auto transition-opacity hover:opacity-60"
                    >
                        GitHub
                    </a>
                </div>

            </div>

            {/* Scroll */}
            <span className="absolute bottom-6 right-6 z-10 text-[11px] uppercase tracking-[0.12em] md:bottom-8 md:right-8">
                Scroll ↓
            </span>

        </section>
    );
};

export default Hero;