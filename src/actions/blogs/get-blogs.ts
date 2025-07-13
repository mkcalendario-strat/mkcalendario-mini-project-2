"use server";
import { blogs } from "#/drizzle/schema";
import { db } from "@/actions/db";
import { BlogResult } from "@/types/blogs";
import { formatTime } from "@/utils/time";
import { desc, getTableColumns } from "drizzle-orm";

export default async function getBlogs() {
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
