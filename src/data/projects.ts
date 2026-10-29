import type { TranslationKey } from "@/i18n";

interface Project {
    number: string;
    titleKey: TranslationKey;
    slug: string;
    descriptionKey: TranslationKey;
    year: string;
    technologies: string;
    image: string;
    url?: string;
}

export const projects: Project[] = [
    {
        number: "01",
        titleKey: "projects.web7-devs.title",
        slug: "web7-devs",
        descriptionKey: "projects.web7-devs.description",
        year: "2026",
        technologies: "Next.js · TypeScript · GSAP",
        image: "/projects/web7.png",
        url: "https://web7devs.com/",
    },
    {
        number: "02",
        titleKey: "projects.good-meals.title",
        slug: "good-meals",
        descriptionKey: "projects.good-meals.description",
        year: "2026",
        technologies: "Next.js · TypeScript · GSAP",
        image: "/projects/goodmeals.png",
        url: "https://goodmeals.es/",
    },
    {
        number: "03",
        titleKey: "projects.bananaisland-gallery.title",
        slug: "bananaisland-gallery",
        descriptionKey: "projects.bananaisland-gallery.description",
        year: "2025",
        technologies: "React · Java Script · HTML · CSS",
        image: "/projects/bananaisland.png",
    },
    {
        number: "04",
        titleKey: "projects.warehouse-management-system.title",
        slug: "warehouse-management-system",
        descriptionKey: "projects.warehouse-management-system.description",
        year: "2026",
        technologies: "Laravel · PHP · Blade · SCSS · MySQL",
        image: "/projects/managementsys.png",
    },
];