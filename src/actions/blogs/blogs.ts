"use server";
import { blogs } from "#/drizzle/schema";
import { Blog, BlogResult } from "@/types/blogs";
import { uploadBlogImage } from "@/utils/files";
import { formatTime } from "@/utils/time";
import { and, desc, eq, getTableColumns } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { v4 as uuidv4 } from "uuid";
import { db } from "../db";
import { getIdentity } from "../utils/identity";

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

type DeleteBlog = Pick<Blog, "id" | "key">;

export async function deleteBlog({ id, key }: DeleteBlog) {
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

type CheckBlogKey = Pick<Blog, "id" | "key">;

export async function checkBlogKey({ id, key }: CheckBlogKey) {
  if (!id || !key) {
    return { success: false, message: "All fields are required." };
  }

  try {
    const result = await db
      .select({ id: blogs.id })
      .from(blogs)
      .where(and(eq(blogs.id, id), eq(blogs.key, key)));

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

interface EditBlog
  extends Pick<Blog, "id" | "key" | "title" | "description" | "content"> {
  image: File | null;
  newKey: Blog["key"];
}

export async function editBlog({
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

export async function fetchBlog(id: Blog["id"]) {
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

export async function fetchBlogs() {
  try {
    // Exclude key from being fetched.
    const { key, ...rest } = getTableColumns(blogs);
    void key;

    const result = await db
      .select({ ...rest })
      .from(blogs)
      .orderBy(desc(blogs.id), desc(blogs.hearts));

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

export async function getHearts(blogId: Blog["id"]) {
  try {
    const result = await db
      .select({ hearts: blogs.hearts })
      .from(blogs)
      .where(eq(blogs.id, blogId))
      .limit(1);

    const hearts = result[0].hearts;
    return { success: true, message: "Success fetching hearts count.", hearts };
  } catch {
    return { success: false, message: "Error. Cannot fetch hearts count." };
  }
}
