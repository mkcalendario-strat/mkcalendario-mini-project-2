import { Identity } from "@/types/identity";

export interface UserComment extends Identity {
  id: string;
  key: string;
  text: string;
  timestamp: string;
}

export type CommentsData = Pick<
  UserComment,
  "id" | "text" | "timestamp" | "userAvatarSeed" | "userName"
>;
