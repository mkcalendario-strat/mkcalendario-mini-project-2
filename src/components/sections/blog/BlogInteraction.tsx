import { DashboardContent } from "@/components/layouts/DashboardContent";
import AvatarProvider from "@/components/providers/AvatarProvider";
import CommentButton from "@/components/ui/CommentButton";
import HeartButton from "@/components/ui/HeartButton";

type BlogInteractionProps = Pick<Blog, "id">;

export default function BlogInteraction({ id }: BlogInteractionProps) {
  return (
    <DashboardContent
      tight
      title="Interact With This Blog">
      <div className="flex flex-col justify-between gap-3 bg-white p-5 shadow-xl shadow-neutral-300 md:flex-row">
        <div className="flex gap-3">
          <AvatarProvider
            seed="19"
            size="w-[50px]"
          />
          <div className="">
            <p>Interacting as</p>
            <p className="font-medium">Mark Kenneth</p>
          </div>
        </div>

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
