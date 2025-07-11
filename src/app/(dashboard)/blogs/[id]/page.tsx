import fetchBlog from "@/actions/fetch-blog";
import BlogCommentBox from "@/components/sections/blog/BlogCommentBox";
import BlogContent from "@/components/sections/blog/BlogContent";
import BlogDetails from "@/components/sections/blog/BlogDetails";
import BlogInteraction from "@/components/sections/blog/BlogInteraction";
import { showErrorToast } from "@/utils/toast";
import { redirect, RedirectType } from "next/navigation";
import { Fragment } from "react";

interface BlogProps {
  params: Promise<{ id: string }>;
}

export default async function Blog({ params }: BlogProps) {
  const { id } = await params;
  const { success, message, data } = await fetchBlog(id);

  if (!success) {
    showErrorToast(message);
  }

  if (typeof data === "undefined") {
    redirect("/404", RedirectType.push);
  }

  return (
    <Fragment>
      <BlogDetails
        id={data.id}
        image={data.image}
        title={data.title}
        description={data.description}
        content={data.content}
        timestamp={data.timestamp}
        userName={data.userName}
        userAvatarSeed={data.userAvatarSeed}
      />
      <BlogContent content={data.content} />
      <BlogInteraction id={data.id} />
      <BlogCommentBox id={data.id} />
    </Fragment>
  );
}
