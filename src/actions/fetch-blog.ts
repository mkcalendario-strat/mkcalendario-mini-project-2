"use server";

import { eq } from "drizzle-orm";
import { blogs } from "../../drizzle/schema";
import { db } from "./db";

type BlogResult = Omit<Blog, "key" | "comments" | "likes"> | undefined;

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
      timestamp: new Date(blog.timestamp).toLocaleString("en-US")
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
