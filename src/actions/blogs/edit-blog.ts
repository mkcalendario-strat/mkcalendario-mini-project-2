"use server";

import { blogs } from "#/drizzle/schema";
import { db } from "@/actions/db";
import { Blog } from "@/types/blogs";
import { uploadBlogImage } from "@/utils/files";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

interface EditBlog
  extends Pick<Blog, "id" | "key" | "title" | "description" | "content"> {
  image: File | null;
  newKey: Blog["key"];
}

export default async function editBlog({
  id,
  key,
  title,
  image,
  newKey,
  content,
  description
}: EditBlog) {
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
      const newImageName = `${uuidv4()}.jpg`;
      await uploadBlogImage(image, newImageName);
      updateSet.image = newImageName;
    }

    if (newKey) {
      updateSet.key = newKey;
    }

    const result = await db
      .update(blogs)
      .set(updateSet)
      .where(and(eq(blogs.id, id), eq(blogs.key, key)))
      .returning({ editedId: blogs.id });

    if (result.length === 0) {
      return { success: false, message: "No blog has been edited." };
    }

    revalidatePath("/blogs");
    const editedId = result[0].editedId;
    return {
      success: true,
      message: "Success editing blog.",
      blogId: editedId
    };
  } catch {
    return { success: false, message: "Error. Cannot edit blog." };
  }
}
