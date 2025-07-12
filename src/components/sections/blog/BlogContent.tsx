import { DashboardContent } from "@/components/layouts/DashboardContent";
import { Blog } from "@/types/blogs";

type BlogContentProps = Pick<Blog, "content">;

export default function BlogContent({ content }: BlogContentProps) {
  return (
    <DashboardContent tight>
      <article
        className="prose max-sm:prose-sm prose-neutral prose-headings:text-neutral-800 prose-h1:text-2xl prose-h2:text-xl md:prose-h1:font-bold prose-h3:text-lg prose-h4:text-md prose-h5:text-sm prose-h6:text-xs md:prose-h1:text-4xl md:prose-h2:text-3xl md:prose-h3:text-2xl md:prose-h4:text-xl md:prose-h5:text-lg md:prose-h6:text-md prose-headings:tracking-tight mx-auto max-w-full [&>*]:my-[15px] [&>*]:text-justify"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </DashboardContent>
  );
}
