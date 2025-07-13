"use server";

import { blogs, comments } from "#/drizzle/schema";
import { db } from "@/actions/db";
import { getIdentity } from "@/actions/utils/identity";
import { Blog } from "@/types/blogs";
import { CommentsData, UserComment } from "@/types/interactions";
import { formatTime } from "@/utils/time";
import { and, desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { isCommentKeyCorrect } from "./utils";

interface AddCommentProps extends Pick<UserComment, "text"> {
  blogId: Blog["id"];
  desiredKey: UserComment["key"];
}

export async function addComment({
  text,
  desiredKey,
  blogId
}: AddCommentProps) {
  const { userName, userAvatarSeed } = await getIdentity();

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

export async function fetchComment(commentId: UserComment["id"]) {
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

type EditCommentProps = Pick<UserComment, "id" | "key" | "text">;

export async function editComment({ id, key, text }: EditCommentProps) {
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

export async function deleteComment(
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

export default async function sendHeart(blogId: Blog["id"]) {
  try {
    const result = await db
      .update(blogs)
      .set({
        hearts: sql`${blogs.hearts} + 1`
      })
      .where(eq(blogs.id, blogId))
      .returning({ hearts: blogs.hearts });

    const hearts = result[0].hearts;
    return { success: true, message: "Success giving heart.", hearts };
  } catch {
    return { success: false, message: "Error. Cannot give heart." };
  }
}
