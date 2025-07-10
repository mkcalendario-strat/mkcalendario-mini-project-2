interface Blog {
  id: string;
  key: string;
  image: string;
  title: string;
  description: string;
  timestamp: string;
  content: string;
  user: string;
  userAvatarSeed: string;
  likes: string;
  comments: UserComment[];
}
