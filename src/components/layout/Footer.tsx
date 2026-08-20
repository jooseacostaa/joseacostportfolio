"use client";

const Footer = () => {
    const handleBackToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <footer className="px-6 md:px-8">
            <div className="flex min-h-12 items-center justify-between border-t border-black/15 py-4 text-[11px] uppercase tracking-[0.12em]">

                {/* Logo / Name */}
                <span>
                    José Acosta
                </span>

                {/* Navigation */}
                <nav className="hidden items-center gap-6 md:flex">
                    <a
                        href="#work"
                        className="group relative inline-block"
                    >
                        Work

                        <span className="absolute bottom-[-3px] left-1/2 h-px w-0 -translate-x-1/2 bg-current transition-all duration-300 group-hover:w-full" />
                    </a>

                    <a
                        href="#about"
                        className="group relative inline-block"
                    >
                        About

                        <span className="absolute bottom-[-3px] left-1/2 h-px w-0 -translate-x-1/2 bg-current transition-all duration-300 group-hover:w-full" />
                    </a>

                    <a
                        href="#contact"
                        className="group relative inline-block"
                    >
                        Contact

                        <span className="absolute bottom-[-3px] left-1/2 h-px w-0 -translate-x-1/2 bg-current transition-all duration-300 group-hover:w-full" />
                    </a>
                </nav>

                {/* Back to top */}
                <button
                    type="button"
                    onClick={handleBackToTop}
                    className="group relative inline-block"
                >
                    Back to top ↑

                    <span className="absolute bottom-[-3px] left-1/2 h-px w-0 -translate-x-1/2 bg-current transition-all duration-300 group-hover:w-full" />
                </button>

            </div>
        </footer>
    );
};

export default Footer;