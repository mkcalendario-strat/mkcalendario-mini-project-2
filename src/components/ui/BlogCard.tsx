"use client";

import { Blog } from "@/types/blogs";
import Image from "next/image";
import Link from "next/link";
import Identity from "../providers/Identity";

interface BlogCardProps extends Omit<Blog, "key" | "comments" | "hearts"> {
  className?: string;
}

export default function BlogCard({
  className,
  id,
  image,
  title,
  description,
  timestamp,
  userName,
  userAvatarSeed
}: BlogCardProps) {
  const baseClasses =
    "gap-5 shadow-sm bg-white p-3 flex flex-col justify-between group";

  const classes = `${baseClasses} ${className ?? ""}`.trim();

  return (
    <Link
      className={classes}
      href={`/blogs/${id}`}>
      <div className="flex flex-col gap-3">
        <BlogImage
          image={image}
          title={title}
        />
        <BlogDetails
          title={title}
          description={description}
        />
      </div>
      <Identity
        imageSize="w-[40px]"
        description={timestamp}
        userName={userName}
        userAvatarSeed={userAvatarSeed}
      />
    </Link>
  );
}

type BlogImageProps = Pick<Blog, "image" | "title">;

function BlogImage({ image, title }: BlogImageProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-neutral-200">
      <Image
        fill
        alt={title}
        src={`${process.env.NEXT_PUBLIC_BLOB_URL}/${image}`}
        className="object-cover duration-100 group-hover:scale-[101%]"
        sizes="(min-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

type BlogDetailsProps = Pick<Blog, "title" | "description">;

function BlogDetails({ title, description }: BlogDetailsProps) {
  return (
    <div className="flex flex-col">
      <p className="line-clamp-2 text-lg font-bold text-neutral-800">{title}</p>
      <p className="line-clamp-3 text-neutral-700">{description}</p>
    </div>
  );
}
