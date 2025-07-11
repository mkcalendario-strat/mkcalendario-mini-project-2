"use server";

import { formatTime } from "@/utils/time";
import { eq } from "drizzle-orm";
import { blogs } from "../../drizzle/schema";
import { db } from "./db";

type BlogResult = Omit<Blog, "key" | "comments" | "hearts"> | undefined;

export type FetchBlogReturn = {
  success: boolean;
  message: string;
  data?: BlogResult;
};

export default async function fetchBlog(id: string): Promise<FetchBlogReturn> {
  try {
    const result = await db
      .select()
      .from(blogs)
      .where(eq(blogs.id, parseInt(id)))
      .orderBy(blogs.id);

    const formatted = result.map((blog) => ({
      ...blog,
      timestamp: formatTime(blog.timestamp)
    }));

    return {
      success: true,
      message: "Blog succesfully fetched.",
      data: formatted[0] as unknown as BlogResult
    };
  } catch {
    return { success: false, message: "Error. Cannot fetch blog." };
  }
}
