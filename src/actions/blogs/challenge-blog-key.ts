"use server";

import { blogs } from "#/drizzle/schema";
import { db } from "@/actions/db";
import { Blog } from "@/types/blogs";
import { and, eq } from "drizzle-orm";

type CheckBlogKey = Pick<Blog, "id" | "key">;

export default async function challengeBlogKey({ id, key }: CheckBlogKey) {
  if (!id || !key) {
    return { success: false, message: "All fields are required." };
  }

  try {
    const result = await db
      .select({ id: blogs.id })
      .from(blogs)
      .where(and(eq(blogs.id, id), eq(blogs.key, key)));

    if (result.length === 0) {
      return {
        success: false,
        message: "No blog is associated with this ID and key."
      };
    }

    return { success: true, message: "You may now edit this blog." };
  } catch {
    return { success: false, message: "Error. Cannot delete blog" };
  }
}
