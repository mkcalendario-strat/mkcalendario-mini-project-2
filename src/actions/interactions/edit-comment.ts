"use server";

import { comments } from "#/drizzle/schema";
import { UserComment } from "@/types/interactions";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { isCommentKeyCorrect } from "./utils";

type EditCommentProps = Pick<UserComment, "id" | "key" | "text">;

export default async function editComment({ id, key, text }: EditCommentProps) {
  try {
    const isKeyCorrect = await isCommentKeyCorrect(id, key);

    if (!isKeyCorrect) {
      return { success: false, message: "Error. Comment key is incorrect." };
    }

    await db.update(comments).set({ text }).where(eq(comments.id, id));

    revalidatePath("/blogs/[id]");
    return { success: true, message: "Comment edited successfully." };
  } catch {
    return { success: false, message: "Error. Cannot edit comment." };
  }
}
