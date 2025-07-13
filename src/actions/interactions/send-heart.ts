"use server";

import { blogs } from "#/drizzle/schema";
import { db } from "@/actions/db";
import { Blog } from "@/types/blogs";
import { eq, sql } from "drizzle-orm";

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
