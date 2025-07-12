import CreateBlogForm from "@/components/sections/create-blog/CreateBlogForm";
import { Fragment } from "react";

export async function generateMetadata() {
  return {
    title: "Create Blog",
    description: "Create blog that has sense."
  };
}

export default function CreateBlog() {
  return (
    <Fragment>
      <CreateBlogForm />
    </Fragment>
  );
}
