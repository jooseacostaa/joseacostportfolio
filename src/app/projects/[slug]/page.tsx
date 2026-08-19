import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import { projects } from "@/data/projects";

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
        <main className="bg-[#f7f6f2]">

            {/* Hero image */}
            <section className="relative h-[100dvh] w-full overflow-hidden">
                <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
            </section>

            {/* Project information */}
            <section className="px-6 py-24 md:px-8 md:py-40">

                {/* Header */}
                <div className="mb-20 flex items-start justify-between text-[11px] uppercase tracking-[0.12em]">
                    <span>
                        {project.number} · {project.year}
                    </span>

                    <Link
                        href="/#work"
                        className="group relative inline-block"
                    >
                        Back to work

                        <span className="absolute bottom-[-4px] left-1/2 h-px w-0 -translate-x-1/2 bg-current transition-all duration-300 group-hover:w-full" />
                    </Link>
                </div>

                {/* Title */}
                <div className="mb-24">
                    <h1 className="italic text-[clamp(5rem,14vw,14rem)] leading-[0.75] tracking-[-0.05em]">
                        {project.title}
                    </h1>
                </div>

                {/* Information */}
                <div className="grid gap-16 md:grid-cols-2">

                    {/* Description */}
                    <div>
                        <span className="text-[11px] uppercase tracking-[0.12em]">
                            About
                        </span>

                        <p className="font-instrument mt-8 max-w-xl text-3xl leading-[1.05] tracking-[-0.02em] md:text-5xl">
                            {project.description}
                        </p>
                    </div>

                    {/* Details */}
                    <div className="md:pt-1">

                        <span className="text-[11px] uppercase tracking-[0.12em]">
                            Technologies
                        </span>

                        <p className="mt-8 max-w-sm text-[11px] uppercase leading-relaxed tracking-[0.12em]">
                            {project.technologies}
                        </p>

                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative mt-10 inline-block text-[11px] uppercase tracking-[0.12em]"
                            >
                                Visit website ↗

                                <span className="absolute bottom-[-4px] left-1/2 h-px w-0 -translate-x-1/2 bg-current transition-all duration-300 group-hover:w-full" />
                            </a>
                        )}

                    </div>

                </div>

            </section>

        </main>
    );
};

export default ProjectPage;