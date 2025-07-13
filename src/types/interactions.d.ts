import { comments } from "#/drizzle/schema";
import { InferSelectModel } from "drizzle-orm";

export type UserComment = InferSelectModel<typeof comments>;

export type CommentsData = Pick<
  UserComment,
  "id" | "text" | "timestamp" | "userAvatarSeed" | "userName"
>;
