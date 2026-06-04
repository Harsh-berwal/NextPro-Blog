import type { Metadata } from "next";
import { Navbar } from "@/components/web/navbar";

export const metadata: Metadata = {
    title: "NextPro",
    description: "Read, write, and manage blog posts on NextPro.",
};

export default function sharedLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
        </>
    )
}