"use client";

import AvatarProvider from "@/components/providers/AvatarProvider";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps extends Omit<Blog, "key" | "comments" | "likes"> {
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
      <UserDetails
        name={userName}
        avatarSeed={userAvatarSeed}
        timestamp={timestamp}
      />
    </Link>
  );
}

interface BlogImageProps {
  image: string;
  title: string;
}

function BlogImage({ image, title }: BlogImageProps) {
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-neutral-200">
      <Image
        fill
        alt={title}
        src={`/api/image/${image}`}
        className="object-cover duration-100 group-hover:scale-[101%]"
        sizes="(min-width: 768px) 100vw, 50vw"
      />
    </div>
  );
}

interface BlogDetailsProps {
  title: string;
  description: string;
}

function BlogDetails({ title, description }: BlogDetailsProps) {
  return (
    <div className="flex flex-col">
      <p className="line-clamp-2 text-lg font-bold text-neutral-800">{title}</p>
      <p className="line-clamp-3 text-neutral-700">{description}</p>
    </div>
  );
}

interface UserDetailsProps {
  name: string;
  avatarSeed: string;
  timestamp: string;
}

function UserDetails({ name, avatarSeed, timestamp }: UserDetailsProps) {
  return (
    <div className="flex flex-wrap items-center gap-[10px]">
      <AvatarProvider
        size="w-[40px]"
        seed={avatarSeed}
      />
      <div className="text-neutral-700">
        <p className="leading-[20px] font-medium">{name}</p>
        <p className="leading-[20px]">{timestamp}</p>
      </div>
    </div>
  );
}
