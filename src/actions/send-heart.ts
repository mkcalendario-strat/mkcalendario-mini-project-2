"use server";

import { eq, sql } from "drizzle-orm";
import { blogs } from "../../drizzle/schema";
import { db } from "./db";

export default async function sendHeart(blogId: string) {
  try {
    const result = await db
      .update(blogs)
      .set({
        hearts: sql`${blogs.hearts} + 1`
      })
      .where(eq(blogs.id, parseInt(blogId)))
      .returning({ hearts: blogs.hearts });

    const hearts = result[0].hearts;
    return { success: true, message: "Success giving heart.", hearts };
  } catch {
    return { success: false, message: "Error. Cannot give heart." };
  }
}
