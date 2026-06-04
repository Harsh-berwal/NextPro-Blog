import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Account | NextPro",
    description: "Sign in or create a NextPro account.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="absolute top-5 left-5">
                <Link href="/" className={buttonVariants({ variant: "secondary" })}>
                    <ArrowLeft className="size-4" />
                    Go back
                </Link>
            </div>
            <div className="w-full max-w-md mask-x-to-mauve-50 p-8 space-y-6 rounded-lg shadow">
                {children}
            </div>
        </div>
    );
}