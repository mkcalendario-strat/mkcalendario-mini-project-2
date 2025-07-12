"use server";

import { Blog, BlogResult } from "@/types/blogs";
import { formatTime } from "@/utils/time";
import { eq } from "drizzle-orm";
import { blogs } from "../../drizzle/schema";
import { db } from "./db";

export default async function fetchBlog(id: Blog["id"]) {
  try {
    const result = await db
      .select()
      .from(blogs)
      .where(eq(blogs.id, id))
      .orderBy(blogs.id);

    const formatted = result.map((blog) => ({
      ...blog,
      timestamp: formatTime(blog.timestamp)
    }));

    return {
      success: true,
      message: "Blog succesfully fetched.",
      data: formatted[0] as BlogResult
    };
  } catch {
    return { success: false, message: "Error. Cannot fetch blog." };
  }
}
