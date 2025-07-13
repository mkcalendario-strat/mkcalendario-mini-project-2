"use server";
import { blogs } from "#/drizzle/schema";
import { db } from "@/actions/db";
import { Blog, BlogResult } from "@/types/blogs";
import { formatTime } from "@/utils/time";
import { desc, eq, getTableColumns } from "drizzle-orm";

export async function getBlogs() {
  try {
    // Exclude key from being fetched.
    const { key, ...rest } = getTableColumns(blogs);
    void key;

    const result = await db
      .select({ ...rest })
      .from(blogs)
      .orderBy(desc(blogs.id), desc(blogs.hearts));

    const formatted = result.map((blog) => ({
      ...blog,
      timestamp: formatTime(blog.timestamp)
    }));

    return {
      success: true,
      message: "Blogs succesfully fetched.",
      blogs: formatted as BlogResult[]
    };
  } catch {
    return { success: false, message: "Error. Cannot fetch blogs." };
  }
}

export async function getHearts(blogId: Blog["id"]) {
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
