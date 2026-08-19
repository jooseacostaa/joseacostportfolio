import { projects } from "@/data/projects";

const Projects = () => {
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
            <div>
                {projects.map((project) => (
                    <article
                        key={project.number}
                        className="group border-t border-black/20 py-8"
                    >
                        <div className="grid grid-cols-[40px_1fr_auto] items-start gap-6 md:grid-cols-[60px_1fr_200px_auto]">

                            <span className="text-[11px] uppercase tracking-[0.1em]">
                                {project.number}
                            </span>

                            <div>
                                <h3 className="font-instrument text-4xl leading-none tracking-[-0.03em] transition-transform duration-300 group-hover:translate-x-2 md:text-6xl">
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
                    </article>
                ))}
            </div>
        </section>
    );
};

export default Projects;