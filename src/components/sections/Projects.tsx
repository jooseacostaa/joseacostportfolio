"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { projects } from "@/data/projects";
import ProjectPreview, { ProjectPreviewHandle, } from "@/components/ui/ProjectPreview";

import { useRef, useState } from "react";

const Projects = () => {
    const router = useRouter();

    const previewRef = useRef<ProjectPreviewHandle>(null);

    const [activeProject, setActiveProject] = useState<string | null>(null);

    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0,
    });

    const activeProjectData = projects.find(
        (project) => project.slug === activeProject
    );

    const handleMouseMove = (
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        setMousePosition({
            x: event.clientX + 30,
            y: event.clientY + 30,
        });
    };

    const handleProjectClick = async (
        event: React.MouseEvent<HTMLAnchorElement>,
        slug: string
    ) => {
        event.preventDefault();

        if (!previewRef.current) {
            router.push(`/projects/${slug}`);
            return;
        }

        await previewRef.current.expand();

        router.push(`/projects/${slug}`);
    };

    return (
        <section
            id="work"
            className="min-h-screen px-6 py-24 md:px-8 md:py-20"
        >
            {/* Header */}
            <div className="mb-20 flex items-end justify-between">
                <h2 className="font-instrument text-6xl tracking-[-0.04em] md:text-9xl">
                    Work
                </h2>

                <span className="text-[11px] uppercase tracking-[0.12em]">
                    Selected projects
                </span>
            </div>

            {/* Projects */}
            <div onMouseMove={handleMouseMove}>
                {projects.map((project) => (
                    <Link
                        key={project.slug}
                        href={`/projects/${project.slug}`}
                        onMouseEnter={() =>
                            setActiveProject(project.slug)
                        }
                        onMouseLeave={() =>
                            setActiveProject(null)
                        }
                        onClick={(event) =>
                            handleProjectClick(event, project.slug)
                        }
                        className="group block border-t border-black/15 py-10 transition-opacity duration-300 hover:opacity-70"
                    >
                        <div className="grid grid-cols-[40px_1fr_auto] items-start gap-6 md:grid-cols-[60px_1fr_200px_auto]">

                            <span className="text-[11px] uppercase tracking-[0.1em]">
                                {project.number}
                            </span>

                            <div>
                                <h3 className="italic text-4xl leading-none tracking-[-0.03em] transition-transform duration-500 ease-out group-hover:translate-x-3 md:text-6xl">
                                    {project.title}
                                </h3>

                                <p className="mt-3 text-xs uppercase tracking-[0.1em]">
                                    {project.technologies}
                                </p>
                            </div>

                            <span className="hidden text-xs uppercase tracking-[0.1em] md:block">
                                {project.description}
                            </span>

                            <span className="text-xs uppercase tracking-[0.1em]">
                                {project.year}
                            </span>

                        </div>
                    </Link>
                ))}
            </div>

            {/* Floating preview */}
            {activeProjectData && (
                <ProjectPreview
                    ref={previewRef}
                    image={activeProjectData.image}
                    visible={Boolean(activeProject)}
                    x={mousePosition.x}
                    y={mousePosition.y}
                />
            )}
        </section>
    );
};

export default Projects;