"use server";

import { comments } from "#/drizzle/schema";
import { Blog } from "@/types/blogs";
import { UserComment } from "@/types/interactions";
import { revalidatePath } from "next/cache";
import { db } from "../db";
import { getIdentity } from "../utils/identity";

interface AddCommentProps extends Pick<UserComment, "text"> {
  blogId: Blog["id"];
  desiredKey: UserComment["key"];
}

export default async function addComment({
  text,
  desiredKey,
  blogId
}: AddCommentProps) {
  const { userName, userAvatarSeed } = await getIdentity();

  if (!text || !desiredKey)
    return { success: false, message: "All fields are required." };

  try {
    await db.insert(comments).values({
      text,
      blogId: blogId,
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
