import challengeBlogKey from "@/actions/blogs/challenge-blog-key";
import EditBlogForm from "@/components/sections/edit-blog/EditBlogForm";
import { redirect, RedirectType } from "next/navigation";
import { Fragment } from "react";

interface EditBlogProps {
  params: Promise<{ id: string; key: string }>;
}

export default async function EditBlog({ params }: EditBlogProps) {
  const { id, key } = await params;

  const { success } = await challengeBlogKey({
    id: parseInt(id),
    key
  });

  if (!success) redirect("/401", RedirectType.replace);

  return (
    <Fragment>
      <EditBlogForm
        id={parseInt(id)}
        originalKey={key}
      />
    </Fragment>
  );
}
