import { blogs } from "#/drizzle/schema";
import { db } from "@/actions/db";
import { getIdentity } from "@/actions/utils/identity";
import { Blog } from "@/types/blogs";
import { uploadBlogImage } from "@/utils/files";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";

interface CreateBlog
  extends Pick<Blog, "title" | "description" | "content" | "key"> {
  image: File | null;
}

export async function createBlog({
  key,
  image,
  title,
  content,
  description
}: CreateBlog) {
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
