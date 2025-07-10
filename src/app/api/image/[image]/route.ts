import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ image: string }> }
) {
  const { image } = await params;

  const filePath = path.join(process.cwd(), "uploads", image);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json(
      { success: false, message: "Image not found." },
      { status: 404 }
    );
  }

  const imageBuffer = fs.readFileSync(filePath);
  return new NextResponse(imageBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/jpeg"
    }
  });
}
