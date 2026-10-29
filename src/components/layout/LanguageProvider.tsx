"use client";

import { createContext, useContext, useEffect, useSyncExternalStore } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Language = "en" | "es";
const storageKey = "portfolio-language";
const changeEvent = "portfolio-language-change";
let memoryLanguage: Language | undefined;

function getLanguage(): Language {
    if (memoryLanguage) return memoryLanguage;
    try {
        const stored = window.localStorage.getItem(storageKey);
        return stored === "es" ? "es" : "en";
    } catch {
        return "en";
    }
}

function subscribe(onChange: () => void) {
    const onStorage = (event: StorageEvent) => {
        if (event.key === storageKey || event.key === null) {
            memoryLanguage = undefined;
            onChange();
        }
    };
    window.addEventListener(changeEvent, onChange);
    window.addEventListener("storage", onStorage);
    return () => {
        window.removeEventListener(changeEvent, onChange);
        window.removeEventListener("storage", onStorage);
    };
}

function setLanguage(language: Language) {
    memoryLanguage = language;
    try {
        window.localStorage.setItem(storageKey, language);
    } catch {
        // Switching still works when browser storage is unavailable.
    }
    window.dispatchEvent(new Event(changeEvent));
}

const LanguageContext = createContext<Language>("en");

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const language = useSyncExternalStore(subscribe, getLanguage, () => "en" as const);

    useEffect(() => {
        document.documentElement.lang = language;
        const frame = requestAnimationFrame(() => ScrollTrigger.refresh());
        return () => cancelAnimationFrame(frame);
    }, [language]);

    return <LanguageContext.Provider value={language}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
    return useContext(LanguageContext);
}

export function LocalizedText({ en, es }: { en: string; es: string }) {
    return useLanguage() === "es" ? es : en;
}

export function LanguageSwitch() {
    const language = useLanguage();
    const nextLanguage = language === "en" ? "es" : "en";

    return (
        <button
            type="button"
            onClick={() => setLanguage(nextLanguage)}
            lang={nextLanguage}
            aria-label={language === "en" ? "Cambiar a español" : "Switch to English"}
            className="inline-flex min-h-10 min-w-10 shrink-0 items-center justify-center border border-current/25 px-2 text-[11px] uppercase tracking-[0.12em] transition-colors hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4"
        >
            {nextLanguage.toUpperCase()}
        </button>
    );
}
