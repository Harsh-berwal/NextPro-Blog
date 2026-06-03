import {  mutation, query } from "./_generated/server";
import { v } from "convex/values"
import { authComponent } from "./auth";
import { ConvexError } from "convex/values";

export const getCommentsByPostId = query({
  args: {
    postId: v.id("posts"),
    },
    handler: async (ctx, args) => {
        const comments = await ctx.db.query("comments")
        .filter((comment) => comment.eq(comment.field('postId'), args.postId))
        .order("desc")
        .collect();
        return comments;
    }
});

export const addComment = mutation({
  args: {
    postId: v.id("posts"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("User not authenticated");
    }
    const post = await ctx.db.get(args.postId);
    if (!post) {
      throw new ConvexError("Post not found");
    }
    const commentId = await ctx.db.insert("comments", {
      postId: args.postId,
      authorId: user._id,
      authorName: user.name || "Anonymous",
      content: args.content,
    });
    return commentId;
  }
});