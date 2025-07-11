import { fetchComments } from "@/actions/interactions";
import { DashboardContent } from "@/components/layouts/DashboardContent";
import Comment from "@/components/ui/Comment";

type BlogCommentBox = Pick<Blog, "id">;

export default async function BlogCommentBox({ id }: BlogCommentBox) {
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
