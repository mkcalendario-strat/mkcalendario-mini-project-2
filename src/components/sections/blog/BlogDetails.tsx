import { DashboardContent } from "@/components/layouts/DashboardContent";
import Identity from "@/components/providers/Identity";
import { Blog } from "@/types/blogs";
import Image from "next/image";

type BlogDetailsProps = Omit<Blog, "key" | "hearts" | "comments">;

export default function BlogDetails({
  id,
  title,
  description,
  image,
  timestamp,
  userName,
  userAvatarSeed
}: BlogDetailsProps) {
  return (
    <DashboardContent
      tight
      className="flex flex-col gap-[15px]">
      <div className="relative aspect-video w-full bg-neutral-200">
        <Image
          fill
          alt={title}
          className="object-cover"
          src={`${process.env.NEXT_PUBLIC_BLOB_URL}/${image}`}
        />
      </div>
      <p className="text-xs text-neutral-500">Blog ID: {id}</p>
      <h1 className="text-2xl font-black tracking-tight md:text-4xl">
        {title}
      </h1>
      <p className="md:text-xl">{description}</p>

      <div className="flex flex-wrap items-center gap-3">
        <Identity
          imageSize="w-[50px]"
          userName={userName}
          userAvatarSeed={userAvatarSeed}
          description={timestamp}
        />
      </div>
    </DashboardContent>
  );
}
