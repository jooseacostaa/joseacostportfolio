const Hero = () => {
    return (
        <section className="relative min-h-screen w-full overflow-hidden px-6 py-6 md:px-8 md:py-8">

            {/* Navigation */}
            <nav className="absolute top-6 left-6 right-6 flex items-center justify-between text-[11px] uppercase tracking-[0.12em] md:top-8 md:left-8 md:right-8">
                <span>José Acosta</span>

                <div className="flex gap-6">
                    <a href="#work">Work</a>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </div>
            </nav>

            {/* Main content */}
            <div className="flex min-h-screen items-center justify-center">
                <h1 className="text-center font-serif text-[clamp(5rem,16vw,16rem)] leading-[0.75] tracking-[-0.06em]">
                    JOSÉ
                    <br />
                    ACOSTA
                </h1>
            </div>

            {/* Bottom information */}
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-[11px] uppercase tracking-[0.12em] md:bottom-8 md:left-8 md:right-8">
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