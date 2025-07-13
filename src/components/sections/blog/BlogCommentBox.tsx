import getComments from "@/actions/interactions/get-comments";
import { DashboardContent } from "@/components/layouts/DashboardContent";
import Comment from "@/components/ui/Comment";
import EmptySection from "@/components/ui/EmptySection";
import { Blog } from "@/types/blogs";

type BlogCommentBoxProps = Pick<Blog, "id">;

export default async function BlogCommentBox({ id }: BlogCommentBoxProps) {
  const { success, comments } = await getComments(id);

  if (!success || !comments) {
    return null;
  }

  return (
    <DashboardContent
      tight
      className="flex flex-col gap-2">
      {!comments.length && (
        <EmptySection
          text="Start a Conversation"
          description="No comments yet. Say something."
          graphicsSrc="/assets/images/graphics/empty-comment.png"
        />
      )}

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
