import BlogsList from "@/components/sections/blogs/BlogsList";
import { Fragment } from "react";

export async function generateMetadata() {
  return {
    title: "Browse Blogs",
    description: "Browse blogs that interests you."
  };
}

export default function Blogs() {
  return (
    <Fragment>
      <BlogsList />
    </Fragment>
  );
}
