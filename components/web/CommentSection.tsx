"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { createCommentSchema } from "@/app/schemas/comments";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { MessageSquare } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import * as React from "react";
import { Textarea } from "../ui/textarea";
import { useQuery } from "convex/react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Separator } from "@/components/ui/separator";

function getAvatarUrl(seed: string) {
  return `https://avatar.vercel.sh/${encodeURIComponent(seed)}`;
}

export function CommentSection() {
  const params = useParams() as { blogId: Id<"posts"> };
  const data = useQuery(api.comments.getCommentsByPostId, {
    postId: params.blogId,
  });
  const [isPending, startTransition] = React.useTransition();
  const createComment = useMutation(api.comments.addComment);
  const form = useForm({
    resolver: zodResolver(createCommentSchema),
    defaultValues: {
      content: "",
      postId: params.blogId,
    },
  });
  async function onSubmit(data: z.infer<typeof createCommentSchema>) {
    startTransition(async () => {
      try {
        await createComment(data);
        toast.success("Comment posted");
      } catch (error) {
        console.error("Error creating comment:", error);
        toast.error("Failed to add comment");
      }
      form.reset();
    });
  }

  if(data === undefined) {
    return (
      <p className="text-muted-foreground">
        Loading comments...
      </p>
    );
  }
  return (
    <Card className="w-full">
      <CardHeader className="flex items-center gap-2 flex-row border-b py-3">
        <MessageSquare className="size-5" />
        <h2 className="text-xl font-bold">{data ? data.length : 0} Comments</h2>
      </CardHeader>
      <CardContent className="space-y-8 overflow-hidden">
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <Textarea
                  aria-invalid={fieldState.invalid}
                  placeholder="Share your thoughts"
                  className="min-h-[110px] max-w-full w-full bg-input/40 px-3 py-2 resize-y overflow-auto"
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button
            type="submit"
            className="mt-3 bg-violet-500 text-white px-4 py-2 rounded-full"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 animate-spin" />
                <span>Posting...</span>
              </>
            ) : (
              <span>Comment</span>
            )}
          </Button>
        </form>

        {data?.length === 0 && <Separator/>}

        <section className="space-y-4 mt-4 px-5 ">
          {data?.map((comment) => (
            <div
              key={comment._id}
              className="flex items-start justify-between gap-4 py-4 border-b last:border-b-0"
            >
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <Avatar className="size-10 shrink-0">
                    <AvatarImage
                      src={getAvatarUrl(String(comment.authorId))}
                      alt={comment.authorName}
                    />
                  <AvatarFallback>
                    {comment.authorName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                  <p className="font-semibold text-sm truncate">
                    {comment.authorName}
                  </p>
                  <p className="text-sm text-foreground/90 whitespace-pre-wrap break-words">
                    {comment.content}
                  </p>
                </div>
              </div>

              <div className="text-sm text-muted-foreground ml-4 flex-shrink-0 whitespace-nowrap">
                {new Date(comment._creationTime).toLocaleDateString()}
              </div>
            </div>
          ))}
        </section>
      </CardContent>
    </Card>
  );
}
