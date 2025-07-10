import EditBlogForm from "@/components/sections/edit-blog/EditBlogForm";
import { Fragment } from "react";

interface EditBlogProps {
  params: Promise<{ id: string; key: string }>;
}

export default async function EditBlog({ params }: EditBlogProps) {
  const { id, key } = await params;

  return (
    <Fragment>
      <EditBlogForm
        id={id}
        blogKey={key}
      />
    </Fragment>
  );
}
