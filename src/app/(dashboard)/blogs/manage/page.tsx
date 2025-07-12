import ManageBlogForm from "@/components/sections/manage-blog/ManageBlogForm";
import { Fragment } from "react";

export async function generateMetadata() {
  return {
    title: "Manage Blog",
    description: "Manage posted blog."
  };
}

export default function ManageBlog() {
  return (
    <Fragment>
      <ManageBlogForm />
    </Fragment>
  );
}
