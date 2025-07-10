import { put } from "@vercel/blob";

export async function uploadBlogImage(file: File, fileName: string) {
  const { url } = await put(`${fileName}.jpg`, file, { access: "public" });
  return url;
}
