"use server";

import { eq } from "drizzle-orm";
import { blogs } from "../../drizzle/schema";
import { db } from "./db";

export default async function getHearts(blogId: string) {
  try {
    const result = await db
      .select({ hearts: blogs.hearts })
      .from(blogs)
      .where(eq(blogs.id, parseInt(blogId)))
      .limit(1);

    const hearts = result[0].hearts;
    return { success: true, message: "Success fetching hearts count.", hearts };
  } catch {
    return { success: false, message: "Error. Cannot fetch hearts count." };
  }
}
