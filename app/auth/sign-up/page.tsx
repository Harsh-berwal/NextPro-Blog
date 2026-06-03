"use client";

import { signInSchema } from "@/app/schemas/auth";
import {
  CardContent,
  CardDescription,
  CardHeader,
  Card,
  CardTitle,
} from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import * as React from "react";

export default function SignUpPage() {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof signInSchema>) {
    startTransition(async () => {
      await authClient.signUp.email({
        email: data.email,
        password: data.password,
        name: data.name,
        fetchOptions: {
          onSuccess: () => {
            toast.success("Account created successfully");
            router.push("/auth/login");
          },
          onError: (error) => {
            toast.error(error.error.message || "Failed to sign up");
          },
        },
      });
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className="gap-y-4">
            <Controller
              name="name"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Full Name</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your full name"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your email"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field>
                  <FieldLabel>Password</FieldLabel>
                  <Input
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter your password"
                    type="password"
                    {...field}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 animate-spin" />
                  <span>Signing up...</span>
                </>
              ) : (
                <span>Sign Up</span>
              )}
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
