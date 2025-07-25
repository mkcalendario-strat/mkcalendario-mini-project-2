import getBlogs from "@/actions/blogs/get-blogs";
import { DashboardContent } from "@/components/layouts/DashboardContent";
import BlogCard from "@/components/ui/BlogCard";
import EmptySection from "@/components/ui/EmptySection";
import { redirect, RedirectType } from "next/navigation";

export default async function BlogsList() {
  const { success, blogs } = await getBlogs();

  if (!success) {
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
      {!blogs.length && (
        <EmptySection
          text="Oh, Spiders!"
          description="No blogs post yet. Create blog now."
          graphicsSrc="/assets/images/graphics/empty-blogs.png"
        />
      )}

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
