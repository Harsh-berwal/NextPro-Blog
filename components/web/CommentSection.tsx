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


export function CommentSection() {
    const [isPending, startTransition] = React.useTransition();
  const params = useParams() as { blogId: Id<"posts"> };
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
      try{
        await createComment(data);
        toast.success("Comment posted");
      } catch (error) {
        console.error("Error creating comment:", error);
        toast.error("Failed to add comment");
      }
      form.reset();
    });
  }

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center gap-2 flex-row border-b">
        <MessageSquare className="size-5" />
        <h2 className="text-xl font-bold">5 Comments</h2>
      </CardHeader>
      <CardContent>
        <form className="w-full space-y-4s" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Comments</FieldLabel>
                <Textarea
                  aria-invalid={fieldState.invalid}
                  placeholder="share your thoughts..."
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button type="submit" className="mt-3" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  <span>Posting comment...</span>
                </>
              ) : (
                <span>Post Comment</span>
              )}
            </Button>
        </form>
      </CardContent>
    </Card>
  );
}
