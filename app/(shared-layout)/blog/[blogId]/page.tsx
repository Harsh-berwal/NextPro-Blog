import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Separator } from "@/components/ui/separator";
import { CommentSection } from "@/components/web/CommentSection";
import { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{ blogId: Id<"posts"> }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { blogId } = await params;
    const post = await fetchQuery(api.post.getPostById, { postId: blogId });
    if (!post) {
        return {
            title: "Post Not Found | NextPro",
            description: "The blog post you are looking for does not exist.",
        };
    }
    return {
        title: `${post.title} | NextPro`,
        description: post.body.slice(0, 160), // Use the first 160 characters of the post body as the description 
    };
}
export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { blogId } = await params;

    //to run both queries in parallel

    const [post, preloadedComments] = await Promise.all([
        fetchQuery(api.post.getPostById, { postId: blogId }),
        preloadQuery(api.comments.getCommentsByPostId, { postId: blogId }),
    ]);
    
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

        <div className="relative w-full mb-6 bg-muted rounded-xl overflow-hidden shadow-sm max-w-full mx-auto h-64 sm:h-96 
        md\:h-[400px]">
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
        <CommentSection preloadedComments={preloadedComments} />
    </div>
  );
}