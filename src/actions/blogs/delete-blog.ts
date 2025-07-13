"use server";

import { blogs } from "#/drizzle/schema";
import { db } from "@/actions/db";
import { Blog } from "@/types/blogs";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type DeleteBlog = Pick<Blog, "id" | "key">;

export default async function deleteBlog({ id, key }: DeleteBlog) {
  if (!id || !key) {
    return { success: false, message: "All fields are required." };
  }

  try {
    const deleted = await db
      .delete(blogs)
      .where(and(eq(blogs.id, id), eq(blogs.key, key)))
      .returning({ title: blogs.title });

    if (deleted.length === 0) {
      return {
        success: false,
        message: "No blog is associated with this ID and key."
      };
    }

    revalidatePath("/blogs");

    const deletedTitle = deleted[0].title;
    return {
      success: true,
      message: `Blog titled '${deletedTitle}' deleted successfully.`
    };
  } catch {
    return { success: false, message: "Error. Cannot delete blog" };
  }
}
