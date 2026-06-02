"use client";

import { createBlogSchema } from "@/app/schemas/blog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import * as React from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { usePostUploadImage } from "@/lib/postClient";

export default function CreateRoutePage() {
  const mutation = useMutation(api.post.createPost);
  const uploadImage = usePostUploadImage();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      content: "",
      image: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof createBlogSchema>) {
    try {
      const storageId = await uploadImage(values.image);

      await mutation({
        title: values.title,
        body: values.content,
        imageStorageId: storageId as Id<"_storage">,
      });

      try {
        const res = await fetch("/api/revalidate", { method: "POST" });
        if (res.ok) {
          router.refresh();
        }
      } catch {
        // ignore revalidation errors; still navigate
      }

      form.reset();
      toast.success("Blog post created successfully!");
      router.push("/blog");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      toast.error("Failed to create blog post: " + message);
    }
  }
  return (
    <div>
      <div className="space-y-2 text-center mb-6">
        <h1 className="text-7xl font-extrabold tracking-tight md:text-4xl">
          Create Blog Post
        </h1>
        <p className="p-4 pb-6 text-xl text-muted-foreground">
          Share your thoughts with the world.
        </p>
      </div>

      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create Blog Article</CardTitle>
          <CardDescription>Create a new blog article.</CardDescription>
        </CardHeader>
		<CardContent>
		  <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Title</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter the blog title"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Content</FieldLabel>

                  <Textarea 
                    aria-invalid={fieldState.invalid} 
                    placeholder="Enter the blog content" {...field} 
                  /> 
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="image"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Image</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid} 
                    type="file"
                    accept="image/*"
                    onChange ={(event)=>{
                      const file = event.target.files?.[0];
                      field.onChange(file);
                    }}
                  /> 
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  <span>Creating post...</span>
                </>
              ) : (
                <span>Create Post</span>
              )}
            </Button>
        </FieldGroup>
		  </form>
		</CardContent>
      </Card>
    </div>
  );
}
