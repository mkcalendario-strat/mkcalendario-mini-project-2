"use server";

import { BlogResult } from "@/types/blogs";
import { formatTime } from "@/utils/time";
import { getTableColumns } from "drizzle-orm";
import { blogs } from "../../drizzle/schema";
import { db } from "./db";

export default async function fetchBlogs() {
  try {
    // Exclude key from being fetched.
    const { key, ...rest } = getTableColumns(blogs);
    void key;

    const result = await db
      .select({ ...rest })
      .from(blogs)
      .orderBy(blogs.id);

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
