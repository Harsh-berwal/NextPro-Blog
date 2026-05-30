 "use client";

import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";

export function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  return (
    <nav className="w-full flex items-center justify-between py-6 ">
      <div className="flex items-center gap-8 ">
        <Link href="/" className="text-2xl font-bold">
          <h1 className="text-3xl font-bold">
            Next
            <span className="text-blue-500">Pro</span>
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link className={buttonVariants({ variant: "ghost" })} href="/">
            Home
          </Link>

          <Link className={buttonVariants({ variant: "ghost" })} href="/blog">
            Blog
          </Link>

          <Link className={buttonVariants({ variant: "ghost" })} href="/create">
            Create
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {isLoading ? null : isAuthenticated ? (
          <Button
            variant="default"
            onClick={() => {
              authClient.signOut();
            }}
          >
            Log Out
          </Button>
        ) : (
          <>
            <Link className={buttonVariants()} href="/auth/sign-up">
              Sign In
            </Link>

            <Link
              className={buttonVariants({ variant: "outline" })}
              href="/auth/login"
            >
              Log In
            </Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
