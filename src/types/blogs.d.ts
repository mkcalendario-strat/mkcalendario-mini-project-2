interface Blog {
  id: string;
  key: string;
  image: string;
  title: string;
  description: string;
  timestamp: string;
  content: string;
  userName: string;
  userAvatarSeed: string;
  hearts: string;
  comments: UserComment[];
}
