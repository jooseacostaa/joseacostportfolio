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
                    speed={0.28}
                    amplitude={2.2}
                    waveScale={0.55}
                    waveRatio={2.4}
                    swell={22}
                    turbulence={35}
                    tilt={1}
                    zoom={1.1}
                    height={5.5}
                    fogDepth={11}
                    detail="medium"
                    brightness={0.65}
                    opacity={0.85}
                    mouseInteraction
                    parallaxStrength={0.45}
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

            {/* Main content */}
            <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <h1 className="text-center font-serif text-[clamp(5rem,16vw,16rem)] font-normal leading-[0.75] tracking-[-0.07em]">
                    JOSÉ ACOSTA
                </h1>
            </div>

            {/* Bottom information */}
            <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between text-[11px] uppercase tracking-[0.12em] md:bottom-8 md:left-8 md:right-8">
                <div>
                    <p>Software Developer</p>
                    <p>Spain · 2026</p>
                </div>

                <span>Scroll ↓</span>
            </div>

        </section>
    );
};

export default Hero;