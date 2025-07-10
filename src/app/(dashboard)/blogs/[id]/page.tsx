import BlogContent from "@/components/sections/blog/BlogContent";
import BlogDetails from "@/components/sections/blog/BlogDetails";
import BlogInteraction from "@/components/sections/blog/BlogInteraction";
import { Fragment } from "react";

const blogHtml = `
  <h1>Exploring the Beauty of Nature</h1>
  <p><em>Published on July 9, 2025</em></p>

  <p>Nature offers us a peaceful escape from the fast pace of modern life. Whether it's a walk in the park or a hike through the mountains, spending time outdoors is beneficial for both the body and mind.</p>

  <h2>Why Nature Matters</h2>

  <p>Here are a few reasons why connecting with nature is so important:</p>

  <ul>
    <li><strong>Mental health boost:</strong> Natural surroundings help reduce stress and anxiety.</li>
    <li><strong>Physical activity:</strong> Outdoor adventures keep us active and healthy.</li>
    <li><strong>Creativity and focus:</strong> Nature can stimulate creative thinking and improve concentration.</li>
  </ul>

  <h2>A Photo from My Recent Trip</h2>

  <p>Below is a photo I took while hiking last weekend:</p>

  <img src="https://placehold.co/1920x1080" alt="Beautiful nature scenery" />

  <h2>Final Thoughts</h2>

  <p>If you ever feel overwhelmed, take a step outside. Listen to the birds, feel the wind, and just breathe. Nature is always there, waiting to recharge you.</p>

  <p>Thanks for reading! Feel free to leave a comment below or share your own experiences in nature.</p>
`;

export default function Blog() {
  type BlogPreview = Omit<Blog, "key" | "comments" | "likes">;

  const blog: BlogPreview = {
    id: "1",
    image: "/assets/images/graphics/people-puzzle.png",
    title: "Unlocking the Future of Web Development",
    description:
      "Explore the latest trends reshaping how we build for the web.",
    timestamp: "2025-07-09T14:32:00Z",
    content: blogHtml,
    userName: "Alex Johnson",
    userAvatarSeed: "1.4"
  };

  return (
    <Fragment>
      <BlogDetails
        image={blog.image}
        title={blog.title}
        description={blog.description}
        content={blog.content}
        timestamp={blog.timestamp}
        user={blog.user}
        userAvatarSeed={blog.userAvatarSeed}
      />
      <BlogContent content={blog.content} />
      <BlogInteraction id={blog.id} />
    </Fragment>
  );
}
