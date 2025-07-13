import { getIdentity } from "@/actions/utils/identity";
import { DashboardContent } from "@/components/layouts/DashboardContent";
import CommentButton from "@/components/sections/blog/BlogInteraction/CommentButton";
import HeartButton from "@/components/ui/HeartButton";
import Identity from "@/components/ui/Identity";
import { Blog } from "@/types/blogs";

type BlogInteractionProps = Pick<Blog, "id">;

export default async function BlogInteraction({ id }: BlogInteractionProps) {
  const { userName, userAvatarSeed } = await getIdentity();
  return (
    <DashboardContent
      tight
      title="Interact With This Blog">
      <div className="flex flex-col justify-between gap-3 bg-white p-5 shadow-xl shadow-neutral-300 md:flex-row">
        <Identity
          reverse
          userName={userName}
          userAvatarSeed={userAvatarSeed}
          imageSize="w-[50px]"
          description="Interacting as"
        />

        <div className="flex w-full gap-1 md:w-auto">
          <HeartButton
            id={id}
            className="w-[50%] md:w-auto"
          />
          <CommentButton
            id={id}
            className="w-[50%] md:w-auto"
          />
        </div>
      </div>
    </DashboardContent>
  );
}
