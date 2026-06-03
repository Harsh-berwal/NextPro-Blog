import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/web/CommentSection";

interface BlogPostPageProps {
  params: Promise<{ blogId: Id<"posts"> }>;
};


export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { blogId } = await params;
    const post = await fetchQuery(api.post.getPostById, { postId: blogId });
    
    if (!post) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in fade-in
            duration-500 relative"> 
                <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
                <ArrowLeft className="size-2" />
                Back to Blog
                </Link>
                <h1 className="text-2xl font-bold mt-4">Post not found</h1>
            </div>
        );
    }
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 animate-fade-in fade-in
        duration-500 relative">
      <Link
        href="/blog"
        className={buttonVariants({
          variant: "outline",
          className: "mb-6 inline-flex",
        })}
      >
      <ArrowLeft className="size-2" />
        Back to Blog
      </Link>

      <div className="relative w-full h-400 mb-6 bg-muted rounded-xl
        overflow-hidden shadow-sm">
            <Image
                src={post.imageUrl || "/ImageNotUploaded.png"}
                alt={post.title}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
            />
      </div>
        <div className="space-y-4 flex flex-col">
            <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
            <p className="text-muted-foreground text-sm">Posted On: {post._creationTime ? new Date(post._creationTime).toLocaleDateString() : "Unknown"}</p>
        </div>
        <Separator className="my-8" />

        <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap">{post.body}</p>

        <Separator className="my-8" />
        <CommentSection />
    </div>
  );
}