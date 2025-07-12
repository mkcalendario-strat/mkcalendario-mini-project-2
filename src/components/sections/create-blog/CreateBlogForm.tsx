"use client";

import { createBlog } from "@/actions/blogs/blogs";
import { DashboardContent } from "@/components/layouts/DashboardContent";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import WYSIWYGEditor from "@/components/ui/WYSIWYGEditor";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { redirect, RedirectType } from "next/navigation";
import { useRef, useState } from "react";

export default function CreateBlogForm() {
  const formRef = useRef<HTMLFormElement | null>(null);

  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    content: "",
    key: "",
    image: null as File | null
  });

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setBlogData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const file = evt.target.files?.[0] ?? null;
    setBlogData((prev) => ({ ...prev, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(formRef.current as HTMLFormElement);
    const { success, message, blogId } = await createBlog(formData);

    if (!success) return showErrorToast(message);

    showSuccessToast(message);
    redirect(`/blogs/${blogId}`, RedirectType.push);
  };

  return (
    <DashboardContent
      title="Create Blog"
      description="Create and publish blogs that make sense."
      className="bg-white p-10">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col gap-3">
        <Input
          id="title"
          name="title"
          placeholder="Title"
          value={blogData.title}
          onChange={handleInputChange}
        />
        <Input
          id="description"
          name="description"
          placeholder="Description"
          value={blogData.description}
          onChange={handleInputChange}
        />
        <WYSIWYGEditor
          id="content"
          name="content"
          placeholder="Blog Content"
          onChange={handleInputChange}
          value={blogData.content}
        />
        <Input
          id="image"
          type="file"
          name="image"
          accept="image/jpeg"
          placeholder="Image"
          onChange={handleImageChange}
        />
        <Input
          id="key"
          name="key"
          type="password"
          placeholder="Control Key"
          onChange={handleInputChange}
        />
        <div className="flex flex-wrap gap-2">
          <Button
            type="submit"
            className="bg-neutral-900 text-neutral-100">
            <i className="far fa-check" />
            Publish Blog
          </Button>
        </div>
      </form>
    </DashboardContent>
  );
}
