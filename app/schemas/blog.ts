import z from "zod";

export const createBlogSchema = z.object({
  title: z.string().min(5).max(50),
  content: z.string().min(20),
});