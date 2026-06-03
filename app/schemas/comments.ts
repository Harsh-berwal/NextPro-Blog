import z from "zod";
import { Id } from "@/convex/_generated/dataModel";

export const createCommentSchema = z.object({
  postId: z.custom<Id<"posts">>(),
  content: z.string().min(2).max(200),
});
