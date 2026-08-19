"use client";

import { useState } from "react";
import Link from "next/link";

import { projects } from "@/data/projects";
import ProjectPreview from "@/components/ui/ProjectPreview";

const Projects = () => {
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

    return (
        <section
            id="work"
            className="min-h-screen px-6 py-24 md:px-8 md:py-32"
        >
            {/* Header */}
            <div className="mb-20 flex items-end justify-between">
                <h2 className="font-instrument text-6xl tracking-[-0.04em] md:text-8xl">
                    Work
                </h2>

                <span className="text-[11px] uppercase tracking-[0.12em]">
                    Selected projects
                </span>
            </div>

            {/* Projects */}
            <div
                onMouseMove={handleMouseMove}
            >
                {projects.map((project) => (
                    <Link
                        key={project.slug}
                        href={`/projects/${project.slug}`}
                        onMouseEnter={() => setActiveProject(project.slug)}
                        onMouseLeave={() => setActiveProject(null)}
                        className="group block border-t border-black/15 py-10 transition-opacity duration-300 hover:opacity-70"
                    >
                        <div className="grid grid-cols-[40px_1fr_auto] items-start gap-6 md:grid-cols-[60px_1fr_200px_auto]">

                            <span className="text-[11px] uppercase tracking-[0.1em]">
                                {project.number}
                            </span>

                            <div>
                                <h3 className="font-instrument text-4xl leading-none tracking-[-0.03em] transition-transform duration-500 ease-out group-hover:translate-x-3 md:text-6xl">
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