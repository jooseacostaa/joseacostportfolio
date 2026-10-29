import { dictionaries } from "@/i18n";
import { LocalizedText, LanguageSwitch } from "@/components/layout/LanguageProvider";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { projects } from "@/data/projects";
import ProjectBackground from "@/components/ui/ProjectBackground";

interface ProjectPageProps {
    params: Promise<{
        slug: string;
    }>;
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
    const { slug } = await params;

    const project = projects.find(
        (project) => project.slug === slug
    );

    if (!project) {
        notFound();
    }

    return (
        <main className="relative flex min-h-dvh w-full flex-col overflow-hidden px-6 py-6 md:h-dvh md:px-8 md:py-8">

            {/* Gradient Waves background */}
            <ProjectBackground />

            {/* Content */}
            <div className="relative z-10 flex min-h-0 flex-1 flex-col">

                {/* Header */}
                <header className="flex shrink-0 items-center justify-between text-[11px] uppercase tracking-[0.12em]">
                    <Link
                        href="/"
                        className="group relative inline-block"
                    >
                        José Acosta

                        <span className="absolute bottom-[-4px] left-1/2 h-px w-0 -translate-x-1/2 bg-current transition-all duration-300 group-hover:w-full" />
                    </Link>

                    <div className="flex items-center gap-4 md:gap-6">
                    <Link
                        href="/#work"
                        className="group relative inline-block"
                    >
                        <LocalizedText id="project.back" />

                        <span className="absolute bottom-[-4px] left-1/2 h-px w-0 -translate-x-1/2 bg-current transition-all duration-300 group-hover:w-full" />
                    </Link>
                    <LanguageSwitch />
                    </div>
                </header>

                {/* Project */}
                <section className="flex flex-1 flex-col gap-12 py-12 md:min-h-0 md:flex-row md:items-center md:gap-16 md:py-0 lg:gap-24">

                    {/* Left — Information */}
                    <div className="flex w-full flex-col md:w-[48%] lg:w-[45%]">

                        {/* Metadata */}
                        <div className="flex justify-between text-[11px] uppercase tracking-[0.12em]">
                            <span>
                                {project.number}
                            </span>

                            <span>
                                {project.year}
                            </span>
                        </div>

                        {/* Main content */}
                        <div className="mt-12">

                            {/* Title */}
                            <h1 className="font-instrument text-[clamp(5rem,10vw,10rem)] leading-[0.72] tracking-[-0.05em]">
                                <LocalizedText id={project.titleKey} />
                            </h1>

                            {/* Description */}
                            <div className="mt-12">
                                <span className="text-[11px] uppercase tracking-[0.12em]">
                                    <LocalizedText id="project.about" />
                                </span>

                                <p className="font-instrument mt-5 max-w-xl text-2xl leading-[1.05] tracking-[-0.02em] md:text-3xl">
                                    <LocalizedText id={project.descriptionKey} />
                                </p>
                            </div>

                        </div>

                        {/* Bottom information */}
                        <div className="mt-12 grid gap-8 sm:grid-cols-2">

                            {/* Technologies */}
                            <div>
                                <span className="text-[11px] uppercase tracking-[0.12em]">
                                    <LocalizedText id="project.technologies" />
                                </span>

                                <p className="mt-4 max-w-sm text-[11px] uppercase leading-relaxed tracking-[0.12em]">
                                    {project.technologies}
                                </p>
                            </div>

                            {/* Website */}
                            {project.url && (
                                <div className="flex flex-col gap-4">
                                    <span className="text-[11px] uppercase tracking-[0.12em]">
                                        <LocalizedText id="project.website" />
                                    </span>

                                    <a
                                        href={project.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative inline-block w-fit text-[11px] uppercase tracking-[0.12em]"
                                    >
                                        <LocalizedText id="project.visit" />

                                        <span className="absolute bottom-[-4px] left-1/2 h-px w-0 -translate-x-1/2 bg-current transition-all duration-300 group-hover:w-full" />
                                    </a>
                                </div>
                            )}

                        </div>
                    </div>

                    {/* Right — Project image */}
                    <div className="relative h-[45vh] w-full shrink-0 overflow-hidden rounded-[8px] md:h-[75vh] md:w-[48%] lg:w-[45%]">
                        <Image
                            src={project.image}
                            alt={dictionaries.en[project.titleKey]}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 45vw"
                            className="object-cover"
                        />
                    </div>

                </section>

            </div>

        </main>
    );
};

export default ProjectPage;
