"use server";

import { comments } from "#/drizzle/schema";
import { UserComment } from "@/types/interactions";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { isCommentKeyCorrect } from "./utils";

export default async function deleteComment(
  id: UserComment["id"],
  key: UserComment["key"]
) {
  try {
    const isKeyCorrect = await isCommentKeyCorrect(id, key);

    if (!isKeyCorrect) {
      return { success: false, message: "Invalid key. Deletion aborted." };
    }

    await db
      .delete(comments)
      .where(and(eq(comments.id, id), eq(comments.key, key)));

    revalidatePath("/blogs/[id]");
    return { success: true, message: "Comment deleted sucessfully." };
  } catch {
    return { success: false, message: "Error. Cannot delete key." };
  }
}
