import fetchBlogs from "@/actions/fetch-blogs";
import { DashboardContent } from "@/components/layouts/DashboardContent";
import BlogCard from "@/components/ui/BlogCard";
import { showErrorToast } from "@/utils/toast";
import { redirect, RedirectType } from "next/navigation";

export default async function BlogsList() {
  const { success, message, blogs } = await fetchBlogs();

  if (!success) {
    showErrorToast(message);
    return null;
  }

  if (!blogs) {
    return redirect("/blogs", RedirectType.push);
  }

  return (
    <DashboardContent
      title="Sensible Reads"
      description="List of blogs that make sense."
      className="flex flex-col flex-wrap gap-[10px] md:flex-row">
      {blogs.map((blog) => (
        <BlogCard
          {...blog}
          key={blog.id}
          className="w-full md:w-[calc((100%-10px)/2)] xl:w-[calc((100%-10px*2)/3)]"
        />
      ))}
    </DashboardContent>
  );
}
