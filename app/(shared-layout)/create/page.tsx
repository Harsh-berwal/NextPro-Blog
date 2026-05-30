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
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export default function CreateRoutePage() {
  const form = useForm({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

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
		  <form>
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

            <Button type="submit" className="w-full">
              Create Post
            </Button>
        </FieldGroup>
		  </form>
		</CardContent>
      </Card>
    </div>
  );
}
