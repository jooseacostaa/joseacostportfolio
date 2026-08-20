"use client";

interface SkillsPanelProps {
    open: boolean;
    onClose: () => void;
}

const SkillsPanel = ({
    open,
    onClose,
}: SkillsPanelProps) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100]">

            {/* Backdrop */}
            <button
                type="button"
                aria-label="Close skills"
                onClick={onClose}
                className="absolute inset-0 cursor-default bg-black/10"
            />

            {/* Panel */}
            <aside className="absolute right-0 top-0 flex h-full w-full max-w-xl flex-col bg-black px-6 py-6 text-white md:px-8 md:py-8">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.12em]">
                        Skills
                    </span>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close skills"
                        className="text-[11px] uppercase tracking-[0.12em]"
                    >
                        Close ×
                    </button>
                </div>

                {/* Skills */}
                <div className="mt-auto mb-auto">

                    {/* Development */}
                    <div className="border-t border-white/20 py-8">
                        <span className="mb-5 block text-[11px] uppercase tracking-[0.12em] text-white/50">
                            Development
                        </span>

                        <div className="font-instrument text-4xl leading-none tracking-[-0.03em] md:text-5xl">
                            <p>Java</p>
                            <p>Spring Boot</p>
                            <p>React</p>
                            <p>Next.js</p>
                            <p>TypeScript</p>
                        </div>
                    </div>

                    {/* Frontend */}
                    <div className="border-t border-white/20 py-8">
                        <span className="mb-5 block text-[11px] uppercase tracking-[0.12em] text-white/50">
                            Frontend
                        </span>

                        <p className="text-sm uppercase tracking-[0.08em]">
                            HTML · CSS · JavaScript · Tailwind
                        </p>
                    </div>

                    {/* Databases */}
                    <div className="border-t border-white/20 py-8">
                        <span className="mb-5 block text-[11px] uppercase tracking-[0.12em] text-white/50">
                            Databases
                        </span>

                        <p className="text-sm uppercase tracking-[0.08em]">
                            MySQL · MariaDB
                        </p>
                    </div>

                    {/* Tools */}
                    <div className="border-t border-white/20 py-8">
                        <span className="mb-5 block text-[11px] uppercase tracking-[0.12em] text-white/50">
                            Tools
                        </span>

                        <p className="text-sm uppercase tracking-[0.08em]">
                            Git · GitHub · VS Code · IntelliJ
                        </p>
                    </div>

                </div>

            </aside>
        </div>
    );
};

export default SkillsPanel;