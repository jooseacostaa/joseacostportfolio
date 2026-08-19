import type { Metadata } from "next";

import "./globals.css";

import PageTransition from "@/components/layout/PageTransition";

export const metadata: Metadata = {
    title: "José Acosta — Software Developer",
    description: "Portfolio de José Acosta, Software Developer.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <body>
                <PageTransition />
                {children}
            </body>
        </html>
    );
}