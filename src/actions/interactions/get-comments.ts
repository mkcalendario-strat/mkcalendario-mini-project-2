"use server";
import { comments } from "#/drizzle/schema";
import { Blog } from "@/types/blogs";
import { CommentsData } from "@/types/interactions";
import { formatTime } from "@/utils/time";
import { desc, eq } from "drizzle-orm";
import { db } from "../db";

export default async function getComments(blogId: Blog["id"]) {
  try {
    const result = await db
      .select({
        id: comments.id,
        text: comments.text,
        timestamp: comments.timestamp,
        userName: comments.userName,
        userAvatarSeed: comments.userAvatarSeed
      })
      .from(comments)
      .orderBy(desc(comments.timestamp))
      .where(eq(comments.blogId, blogId));

    const formatted = result.map((data) => {
      return {
        ...data,
        id: data.id,
        timestamp: formatTime(data.timestamp as string)
      };
    }) as CommentsData[];

    return {
      comments: formatted,
      success: true,
      message: "Success. Comments fetched successfully."
    };
  } catch {
    return { success: false, message: "Eror. Cannot fetch comments." };
  }
}
