"use server";
import { comments } from "#/drizzle/schema";
import { CommentsData, UserComment } from "@/types/interactions";
import { desc, eq } from "drizzle-orm";
import { db } from "../db";

export default async function getComment(commentId: UserComment["id"]) {
  try {
    const result = await db
      .select({ id: comments.id, text: comments.text })
      .from(comments)
      .orderBy(desc(comments.timestamp))
      .where(eq(comments.id, commentId));

    const formatted = result.map((data) => {
      return { ...data, id: data.id };
    }) as CommentsData[];

    return {
      data: formatted[0],
      success: true,
      message: "Success. Comment fetched successfully."
    };
  } catch {
    return { success: false, message: "Eror. Cannot fetch comment." };
  }
}
