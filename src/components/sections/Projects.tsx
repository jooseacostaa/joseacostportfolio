"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { projects } from "@/data/projects";
import ProjectPreview, {
    ProjectPreviewHandle,
} from "@/components/ui/ProjectPreview";
import { usePageTransition } from "@/components/layout/PageTransition";

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
    const router = useRouter();
    const { startProjectTransition } = usePageTransition();

    /*
     * Animation refs
     */
    const workRef = useRef<HTMLElement | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const projectsRef = useRef<HTMLDivElement | null>(null);

    /*
     * Project preview / transition
     */
    const previewRef = useRef<ProjectPreviewHandle>(null);

    const [activeProject, setActiveProject] = useState<string | null>(
        null
    );

    const [mousePosition, setMousePosition] = useState({
        x: 0,
        y: 0,
    });

    const activeProjectData = projects.find(
        (project) => project.slug === activeProject
    );

    /*
     * Work animations
     */
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const work = workRef.current;
            const header = headerRef.current;
            const projectsContainer = projectsRef.current;

            if (!work || !header || !projectsContainer) return;

            const title = header.querySelector("h2");
            const subtitle = header.querySelector("span");

            const projectRows =
                projectsContainer.querySelectorAll(".project-row");

            if (!title || !subtitle || !projectRows.length) return;

            /*
             * Initial states
             */
            gsap.set(title, {
                opacity: 0,
                y: 160,
                scale: 0.65,
                rotate: 3,
            });

            gsap.set(subtitle, {
                opacity: 0,
                y: -60,
                x: 30,
            });

            gsap.set(projectRows, {
                opacity: 0,
                y: 160,
                scale: 0.65,
                delay: 0.1,
            });

            /*
             * Entrance timeline
             */
            const entrance = gsap.timeline({
                scrollTrigger: {
                    trigger: work,
                    start: "top 60%",
                    once: true,
                },
            });

            entrance
                .to(title, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotate: 0,
                    duration: 1.35,
                    ease: "power4.out",
                })
                .to(
                    subtitle,
                    {
                        opacity: 1,
                        y: 0,
                        x: 0,
                        duration: 0.7,
                        ease: "power3.out",
                    },
                    "-=0.75"
                )
                .to(
                    projectRows,
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.9,
                        stagger: 0.14,
                        ease: "power4.out",
                    },
                    "-=0.35"
                );

            /*
             * Exit animation while scrolling down
             */
            gsap.to(work, {
                opacity: 0,
                scale: 0.70,
                y: -180,
                scrollTrigger: {
                    trigger: work,
                    start: "40% top",
                    end: "bottom top",
                    scrub: 1.2,
                },
            });
        }, workRef);

        return () => ctx.revert();
    }, []);

    /*
     * Mouse position for project preview
     */
    const handleMouseMove = (
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        setMousePosition({
            x: event.clientX + 30,
            y: event.clientY + 30,
        });
    };

    /*
     * Project transition
     */
    const handleProjectClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
        slug: string
    ) => {
        event.preventDefault();

        const project = projects.find(
            (item) => item.slug === slug
        );

        const bounds = previewRef.current?.getBounds();

        if (!project || !bounds) {
            router.push(`/projects/${slug}`);
            return;
        }

        startProjectTransition({
            href: `/projects/${slug}`,
            image: project.image,
            origin: {
                left: bounds.left,
                top: bounds.top,
                width: bounds.width,
                height: bounds.height,
            },
        });
    };

    return (
        <section
            ref={workRef}
            id="work"
            className="min-h-screen px-6 py-24 md:px-8 md:py-20"
        >
            {/* Header */}
            <div
                ref={headerRef}
                className="mb-20 flex items-end justify-between"
            >
                <h2 className="font-instrument text-6xl tracking-[-0.04em] md:text-9xl">
                    Work
                </h2>

                <span className="text-[11px] uppercase tracking-[0.12em]">
                    Selected projects
                </span>
            </div>

            {/* Projects */}
            <div
                ref={projectsRef}
                onMouseMove={handleMouseMove}
            >
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
                            handleProjectClick(
                                event,
                                project.slug
                            )
                        }
                        className="group block border-t border-black/15 py-10 transition-opacity duration-300 hover:opacity-70"
                    >
                        <div className="project-row grid grid-cols-[40px_1fr_auto] items-start gap-6 md:grid-cols-[60px_1fr_200px_auto]">

                            {/* Number */}
                            <span className="text-[11px] uppercase tracking-[0.1em]">
                                {project.number}
                            </span>

                            {/* Project information */}
                            <div>
                                <h3 className="italic text-4xl leading-none tracking-[-0.03em] transition-transform duration-500 ease-out group-hover:translate-x-3 md:text-6xl">
                                    {project.title}
                                </h3>

                                <p className="mt-3 text-xs uppercase tracking-[0.1em]">
                                    {project.technologies}
                                </p>
                            </div>

                            {/* Description */}
                            <span className="hidden text-xs uppercase tracking-[0.1em] md:block">
                                {project.description}
                            </span>

                            {/* Year */}
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