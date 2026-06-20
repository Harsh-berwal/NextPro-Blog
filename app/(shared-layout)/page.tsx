
import type { Metadata } from "next";
import Link from "next/link";
import { ThemeProvider } from "@/components/theme-provider";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to NextPro, a modern blog platform.",
};

export default function Home() {
  return (
    <section className="border-b border-zinc-800">
  <div className="max-w-7xl mx-auto px-6">

    <div className="grid lg:grid-cols-2 items-center min-h-[85vh]">

      {/* Left Content */}
      <div className="max-w-2xl">

        <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif leading-[0.9] tracking-tight">
          Share
          <br />
          stories &
          <br />
          ideas
        </h1>

        <p className="mt-8 text-xl text-zinc-400 max-w-xl">
          A place to read, write, and share knowledge with developers,
          creators, and curious minds around the world.
        </p>

        <Link
          href="/blog"
          className="inline-flex mt-10 px-8 py-4 rounded-full bg-purple-600 hover:bg-purple-700 transition text-lg font-medium"
        >
          Start Reading
        </Link>

      </div>

      {/* Right Illustration */}
      <div className="hidden lg:flex justify-end">
        <Image
          src="/123.png"
          alt="NextPro Hero Illustration"
          className="w-full max-w-xl object-contain"
          width={800}
          height={800}
        />
      </div>

    </div>

  </div>
</section>
  );
}
