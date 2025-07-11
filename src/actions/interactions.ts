"use server";

import { formatTime } from "@/utils/time";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { comments } from "../../drizzle/schema";
import { db } from "./db";
import { isCommentKeyCorrect } from "./interactions/utils";

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

export async function fetchComments(blogId: Blog["id"]) {
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
      .where(eq(comments.blogId, parseInt(blogId)));

    const formatted = result.map((data) => {
      return {
        ...data,
        id: data.id.toString(),
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

export async function fetchComment(commentId: UserComment["id"]) {
  try {
    const result = await db
      .select({ id: comments.id, text: comments.text })
      .from(comments)
      .orderBy(desc(comments.timestamp))
      .where(eq(comments.id, parseInt(commentId)));

    const formatted = result.map((data) => {
      return { ...data, id: data.id.toString() };
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

type EditCommentProps = Pick<UserComment, "id" | "key" | "text">;

export async function editComment({ id, key, text }: EditCommentProps) {
  try {
    const isKeyCorrect = await isCommentKeyCorrect(id, key);

    if (!isKeyCorrect) {
      return { success: false, message: "Error. Comment key is incorrect." };
    }

    await db
      .update(comments)
      .set({ text })
      .where(eq(comments.id, parseInt(id)));

    revalidatePath("/");
    return { success: true, message: "Comment edited successfully." };
  } catch {
    return { success: false, message: "Error. Cannot edit comment." };
  }
}
