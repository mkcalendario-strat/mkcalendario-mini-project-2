interface UserComment extends User {
  id: string;
  key: string;
  text: string;
  timestamp: string;
}

type CommentsData = Pick<
  UserComment,
  "id" | "text" | "timestamp" | "userAvatarSeed" | "userName"
>;
