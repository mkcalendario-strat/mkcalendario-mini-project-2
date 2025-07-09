import { DashboardContent } from "@/components/layouts/DashboardContent";
import BlogCard from "@/components/ui/BlogCard";

export default function BlogsList() {
  type BlogsPreview = Omit<Blog, "handle" | "comments" | "likes">[];

  const blogs: BlogsPreview = [
    {
      id: "1",
      image: "/assets/images/graphics/people-puzzle.png",
      title: "Unlocking the Future of Web Development",
      description:
        "Explore the latest trends reshaping how we build for the web.",
      timestamp: "2025-07-09T14:32:00Z",
      content:
        "From AI-powered tooling to edge-first architectures, the web is evolving faster than ever.",
      posterData: {
        name: "Alex Johnson",
        avatarSeed: "1.4"
      }
    },
    {
      id: "2",
      image: "/assets/images/graphics/people-puzzle.png",
      title: "How AI Is Changing the Code We Write",
      description:
        "Discover how machine learning is not just assisting, but reshaping software development.",
      timestamp: "2025-07-08T10:12:00Z",
      content:
        "From autocomplete to autonomous code generation, AI tools are redefining developer productivity.",
      posterData: {
        name: "Jamie Lee",
        avatarSeed: "2.1"
      }
    },
    {
      id: "3",
      image: "/assets/images/graphics/people-puzzle.png",
      title: "Design Systems That Scale",
      description:
        "Learn how to create design systems that stay consistent across fast-moving teams.",
      timestamp: "2025-07-07T08:45:00Z",
      content:
        "A strong design system bridges the gap between development and design while keeping your product scalable.",
      posterData: {
        name: "Morgan Rae",
        avatarSeed: "3.7"
      }
    }
  ];

  return (
    <DashboardContent
      title="Sensible Reads"
      description="List of blogs that make sense."
      className="flex flex-col flex-wrap gap-[10px] md:flex-row">
      {blogs.map((blog) => (
        <BlogCard
          {...blog}
          key={blog.id}
          className="md:w-[calc((100%-10px)/2)] xl:w-[calc((100%-10px*2)/3)]"
        />
      ))}
    </DashboardContent>
  );
}
