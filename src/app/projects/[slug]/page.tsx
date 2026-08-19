import { notFound } from "next/navigation";

import { projects } from "@/data/projects";

import Link from "next/link";

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
        <main className="min-h-screen px-6 py-8 md:px-8">
            {/* Header */}
            <header className="flex items-center justify-between text-[11px] uppercase tracking-[0.12em]">
                <Link href="/">José Acosta</Link>

                <Link href="/#work">
                    Back to work
                </Link>
            </header>

            {/* Project */}
            <section className="pt-32 md:pt-48">
                <div className="mb-16">
                    <span className="text-[11px] uppercase tracking-[0.12em]">
                        {project.number} · {project.year}
                    </span>

                    <h1 className="mt-6 font-instrument text-[clamp(5rem,14vw,14rem)] leading-[0.8] tracking-[-0.05em]">
                        {project.title}
                    </h1>
                </div>

                <div className="grid gap-12 md:grid-cols-2">
                    <div>
                        <p className="text-lg leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    <div>
                        <p className="text-[11px] uppercase tracking-[0.12em]">
                            {project.technologies}
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default ProjectPage;