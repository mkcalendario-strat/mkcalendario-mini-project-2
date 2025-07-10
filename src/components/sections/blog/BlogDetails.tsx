import { DashboardContent } from "@/components/layouts/DashboardContent";
import AvatarProvider from "@/components/providers/AvatarProvider";
import Image from "next/image";

type BlogDetails = Omit<Blog, "id" | "key" | "likes" | "comments">;

export default function BlogDetails({
  title,
  description,
  timestamp,
  userName,
  userAvatarSeed
}: BlogDetails) {
  return (
    <DashboardContent
      tight
      className="flex flex-col gap-[15px]">
      <div className="relative aspect-video w-full bg-neutral-200">
        <Image
          fill
          alt="people puzzle"
          className="object-cover"
          src="/assets/images/graphics/people-puzzle.png"
        />
      </div>
      <h1 className="text-2xl font-black tracking-tight md:text-4xl">
        {title}
      </h1>
      <p className="md:text-xl">{description}</p>

      <div className="flex flex-wrap items-center gap-3">
        <AvatarProvider
          size="w-[40px]"
          seed={userAvatarSeed}
        />

        <div className="text-neutral-700">
          <p className="leading-[15px] font-medium">{userName}</p>
          <p className="text-xs">{timestamp}</p>
        </div>
      </div>
    </DashboardContent>
  );
}
