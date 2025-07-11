"use server";

import { revalidatePath } from "next/cache";
import { comments } from "../../drizzle/schema";
import { db } from "./db";

interface AddCommentProps
  extends Pick<UserComment, "userName" | "userAvatarSeed" | "text"> {
  blogId: Blog["id"];
  desiredKey: UserComment["key"];
}

export async function addComment({
  userName,
  userAvatarSeed,
  text,
  desiredKey,
  blogId
}: AddCommentProps) {
  try {
    await db.insert(comments).values({
      text,
      blogId: parseInt(blogId),
      key: desiredKey,
      userName,
      userAvatarSeed
    });

    revalidatePath("/blogs/[id]");
    return { success: true, message: "Comment has been posted." };
  } catch {
    return { success: false, message: "Error. Cannot post comment." };
  }
}
