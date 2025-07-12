import { blogs } from "#/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export type Blog = InferSelectModel<typeof blogs>;
export type BlogResult = Omit<Blog, "key" | "comments" | "hearts">;
