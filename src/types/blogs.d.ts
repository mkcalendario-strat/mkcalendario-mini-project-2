import { blogs } from "#/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

type Blog = InferSelectModel<typeof blogs>;
type BlogResult = Omit<Blog, "key" | "comments" | "hearts">;
