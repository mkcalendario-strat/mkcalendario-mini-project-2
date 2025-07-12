"use server";

import { uploadBlogImage } from "@/utils/files";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import { blogs } from "../../drizzle/schema";
import { db } from "./db";
import { getIdentity } from "./utils/identity";

export async function createBlog(formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const content = formData.get("content")?.toString().trim();
  const image = formData.get("image") as File | null;
  const key = formData.get("key")?.toString().trim();
  const newImageName = `${uuidv4()}.jpg`;

  const { userName, userAvatarSeed } = await getIdentity();

  if (!title || !description || !content || !key || !image) {
    return { success: false, message: "All fields are required." };
  }

  if (image.type !== "image/jpeg") {
    return { success: false, message: "Unsupported image type." };
  }

  try {
    await uploadBlogImage(image, newImageName);
    const result = await db
      .insert(blogs)
      .values({
        key,
        title,
        description,
        content,
        userName,
        userAvatarSeed,
        image: newImageName
      })
      .returning({ insertedId: blogs.id });

    revalidatePath("/blogs");

    const blogId = result[0].insertedId;
    const message = `Success creating blog. Blog ID is ${blogId}.`;
    return { success: true, message, blogId };
  } catch {
    return { success: false, message: "Error. Cannot create blog." };
  }
}
