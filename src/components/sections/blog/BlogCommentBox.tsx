import { fetchComments } from "@/actions/interactions/interactions";
import { DashboardContent } from "@/components/layouts/DashboardContent";
import Comment from "@/components/ui/Comment";
import { Blog } from "@/types/blogs";

type BlogCommentBoxProps = Pick<Blog, "id">;

export default async function BlogCommentBox({ id }: BlogCommentBoxProps) {
  const { success, comments } = await fetchComments(id);

  if (!success || !comments) {
    return null;
  }

  return (
    <DashboardContent
      tight
      className="flex flex-col gap-2">
      {comments.map((comment, i) => (
        <Comment
          key={i}
          id={comment.id}
          text={comment.text}
          userName={comment.userName}
          timestamp={comment.timestamp}
          userAvatarSeed={comment.userAvatarSeed}
        />
      ))}
    </DashboardContent>
  );
}
