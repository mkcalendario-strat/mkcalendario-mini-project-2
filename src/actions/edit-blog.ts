"use server";

import { Blog } from "@/types/blogs";
import { uploadBlogImage } from "@/utils/files";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { v4 as uuid } from "uuid";
import { blogs } from "../../drizzle/schema";
import { db } from "./db";

export default async function checkBlogKey(
  blogId: Blog["id"],
  key: Blog["key"]
) {
  if (!blogId || !key) {
    return { success: false, message: "All fields are required." };
  }

  try {
    const result = await db
      .select({ id: blogs.id })
      .from(blogs)
      .where(and(eq(blogs.id, blogId), eq(blogs.key, key)));

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

export async function editBlog(
  blogId: Blog["id"],
  key: Blog["key"],
  formData: FormData
) {
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const content = formData.get("content")?.toString().trim();
  const image = formData.get("image") as File | null;
  const newKey = formData.get("key")?.toString().trim();

  if (!title || !description || !content) {
    return {
      success: false,
      message: "Title, description, and content fields are required."
    };
  }

  if (image !== null && image.size !== 0 && image.type !== "image/jpeg") {
    return { success: false, message: "Unsupported image type." };
  }

  type UpdateSet = Partial<
    Pick<Blog, "title" | "description" | "content" | "image" | "key">
  >;

  try {
    const updateSet: UpdateSet = {
      title,
      description,
      content
    };

    if (image !== null && image.size !== 0) {
      const newImageName = `${uuid()}.jpg`;
      await uploadBlogImage(image, newImageName);
      updateSet.image = newImageName;
    }

    if (newKey) {
      updateSet.key = newKey;
    }

    const result = await db
      .update(blogs)
      .set(updateSet)
      .where(and(eq(blogs.id, blogId), eq(blogs.key, key)))
      .returning({ editedId: blogs.id });

    if (result.length === 0) {
      return { success: false, message: "No blog has been edited." };
    }

    revalidatePath("/blogs");
    const id = result[0].editedId;
    return { success: true, message: "Success editing blog.", blogId: id };
  } catch {
    return { success: false, message: "Error. Cannot edit blog." };
  }
}
