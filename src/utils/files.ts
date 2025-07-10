import fs from "fs/promises";

export async function uploadBlogImage(file: File, fileName: string) {
  const data = await file.arrayBuffer();
  await fs.writeFile(`./uploads/${fileName}.jpg`, Buffer.from(data));
}
