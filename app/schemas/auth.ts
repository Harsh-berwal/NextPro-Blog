import { z } from "zod";    

export const signInSchema = z.object({
    name: z.string().min(2),
    email: z.email(),
    password: z.string().min(6).max(30),
});

export const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(6).max(30),
});
