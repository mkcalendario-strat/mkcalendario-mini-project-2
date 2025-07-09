interface Blog {
  id: string;
  handle?: string;
  image: string;
  title: string;
  description: string;
  timestamp: string;
  content: string;
  posterData: User;
  likes: string;
  comments: UserComment[];
}
