import fs from "fs/promises";

const typesExt: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg"
};

export async function uploadBlogImage(
  file: File,
  type: keyof typeof typesExt,
  fileName: string
) {
  const extension = typesExt[type];

  if (!extension) {
    throw new Error(`Unsupported file type: ${type}.`);
  }

  const data = await file.arrayBuffer();
  await fs.writeFile(`./uploads/${fileName}.${extension}`, Buffer.from(data));
}
