import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

const fallbackImageUrl =
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80";


export default async function BlogRoutePage() {
  const data = await fetchQuery(api.post.getPosts);

  return (
    <div className="">
      <div className="text-center pt-5 mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
          Our Blog
        </h1>
        <p className="pt-5 max-w-2xl mx-auto text-xl text-muted-foreground">
          Welcome to the blog! Here are some posts:
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((post) => (
          <Card key={post._id} className="pt-0">
            <div className="relative h-48 w-full overflow-hidden">
              <Image 
                src={fallbackImageUrl}
                alt={post.title} 
                className="rounded-t-lg"
                fill />
            </div>  
            <CardContent>
              <Link
                className="text-sm text-foreground transition-colors hover:text-primary"
                href={`/blog/${post._id}`}
              >
                <h1 className="text-2xl font-bold">
                  {post.title}
                </h1>
              </Link>
              <p className="text-sm text-muted-foreground mt-2">
                {post.body.length > 100
                  ? post.body.substring(0, 100) + "..."
                  : post.body}
              </p>
            </CardContent>
            <CardFooter>
                <Link href={`/blog/${post._id}`} className={buttonVariants({ className: "w-full p-4" })}>
                  Read more
                </Link>
              </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
