"use server";

import { comments } from "#/drizzle/schema";
import { db } from "@/actions/db";
import { UserComment } from "@/types/interactions";
import { and, eq } from "drizzle-orm";

export async function isCommentKeyCorrect(
  id: UserComment["id"],
  key: UserComment["key"]
) {
  const result = await db
    .select()
    .from(comments)
    .where(and(eq(comments.id, id), eq(comments.key, key)));

  return !!result.length;
}
