"use server";

import { uploadBlogImage } from "@/utils/files";
import { v4 as uuidv4 } from "uuid";
import { blogs } from "../../drizzle/schema";
import { db } from "./db";

export async function createBlog(formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  const description = formData.get("description")?.toString().trim();
  const content = formData.get("content")?.toString().trim();
  const userName = formData.get("user-name")?.toString().trim();
  const userAvatarSeed = formData.get("user-avatar-seed")?.toString().trim();
  const image = formData.get("image") as File | null;
  const key = uuidv4();
  const newImageName = uuidv4();

  if (
    !title ||
    !description ||
    !content ||
    !userName ||
    !userAvatarSeed ||
    !image
  ) {
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
        image: `${newImageName}.jpg`
      })
      .returning({ insertedId: blogs.id });

    const blogId = result[0].insertedId;
    return { success: true, message: "Success creating blog.", blogId };
  } catch {
    return { success: false, message: "Error. Cannot create blog." };
  }
}
