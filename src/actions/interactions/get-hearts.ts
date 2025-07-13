"use server";
import { blogs } from "#/drizzle/schema";
import { Blog } from "@/types/blogs";
import { eq } from "drizzle-orm";
import { db } from "../db";

export default async function getHearts(blogId: Blog["id"]) {
  try {
    const result = await db
      .select({ hearts: blogs.hearts })
      .from(blogs)
      .where(eq(blogs.id, blogId))
      .limit(1);

    const hearts = result[0].hearts;
    return { success: true, message: "Success fetching hearts count.", hearts };
  } catch {
    return { success: false, message: "Error. Cannot fetch hearts count." };
  }
}
