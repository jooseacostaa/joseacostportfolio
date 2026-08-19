import type { Metadata } from "next";

import PageTransition from "@/components/layout/PageTransition";

import "./globals.css";

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
                <PageTransition>{children}</PageTransition>
            </body>
        </html>
    );
}
