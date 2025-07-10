import fetchBlog from "@/actions/fetch-blog";
import BlogContent from "@/components/sections/blog/BlogContent";
import BlogDetails from "@/components/sections/blog/BlogDetails";
import BlogInteraction from "@/components/sections/blog/BlogInteraction";
import { showErrorToast } from "@/utils/toast";
import { redirect, RedirectType } from "next/navigation";
import { Fragment } from "react";

export default async function Blog({
  params
}: {
  params: Promise<{ id: string }>;
}) {
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
    </Fragment>
  );
}
