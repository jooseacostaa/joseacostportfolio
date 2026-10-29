import type { Metadata } from "next";
import Link from "next/link";
import PortfolioBackground from "@/components/ui/PortfolioBackground";

export const metadata: Metadata = {
    title: "Page not found — José Acosta",
    description: "This page could not be found. Explore José Acosta’s portfolio and selected projects.",
};

export default function NotFound() {
    return (
        <main className="relative isolate flex min-h-dvh flex-col overflow-hidden px-6 py-6 md:px-8 md:py-8">
            <PortfolioBackground />

            <header className="relative z-10 flex items-center justify-between gap-6 text-[11px] uppercase tracking-[0.12em]">
                <Link
                    href="/"
                    className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                    José Acosta
                </Link>
                <span>Error 404</span>
            </header>

            <section className="relative z-10 flex flex-1 flex-col items-center justify-center py-16 text-center">

                <h1 className="font-instrument mt-10 text-6xl tracking-[-0.03em] md:text-8xl">
                    Page <span className="italic">not found.</span>
                </h1>

                <p className="mt-5 max-w-sm text-sm leading-relaxed">
                    The page you’re looking for doesn’t exist or has moved.
                    Let’s get you back to something that does.
                </p>

                <nav
                    aria-label="Return to portfolio"
                    className="mt-10 flex w-full max-w-sm flex-col items-center gap-6 sm:flex-row sm:justify-center"
                >
                    <Link
                        href="/"
                        className="flex min-h-12 w-full items-center justify-center gap-6 border border-black bg-black px-6 text-[11px] uppercase tracking-[0.12em] text-white transition-colors hover:bg-transparent hover:text-black focus-visible:outline-2 focus-visible:outline-offset-4 sm:w-auto"
                    >
                        Back home <span aria-hidden="true">↗</span>
                    </Link>

                    <Link
                        href="/#work"
                        className="inline-flex min-h-12 items-center gap-3 text-[11px] uppercase tracking-[0.12em] underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
                    >
                        View work <span aria-hidden="true">↗</span>
                    </Link>
                </nav>
            </section>

            <footer className="relative z-10 border-t border-black/15 pt-4 text-[11px] uppercase tracking-[0.12em]">
                Software Developer · Canary Islands, Spain
            </footer>
        </main>
    );
}
