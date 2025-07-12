"use client";

import { editBlog } from "@/actions/edit-blog";
import fetchBlog from "@/actions/fetch-blog";
import { DashboardContent } from "@/components/layouts/DashboardContent";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import WYSIWYGEditor from "@/components/ui/WYSIWYGEditor";
import { Blog } from "@/types/blogs";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { redirect, RedirectType } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

type EditBlogFormProps = Pick<Blog, "id" | "key">;

export default function EditBlogForm({ id, key }: EditBlogFormProps) {
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

  const fetchBlogData = useCallback(async () => {
    const { success, message, data } = await fetchBlog(id);

    if (!success || !data) {
      return showErrorToast(message);
    }

    setBlogData({
      title: data.title,
      description: data.description,
      content: data.content,
      key: "",
      image: null as File | null
    });
  }, [id]);

  const handleEdit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    const formData = new FormData(formRef.current as HTMLFormElement);
    const { success, message, blogId } = await editBlog(id, key, formData);

    if (!success) {
      showErrorToast(message);
      return null;
    }

    showSuccessToast(message);
    redirect(`/blogs/${blogId}`, RedirectType.push);
  };

  useEffect(() => {
    fetchBlogData();
  }, [fetchBlogData]);

  return (
    <DashboardContent
      title="Edit Blog"
      description="You can now edit this blog."
      className="bg-white p-10">
      <form
        ref={formRef}
        onSubmit={handleEdit}
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
          tip="Skip this field to retain the current image."
          onChange={handleImageChange}
        />
        <Input
          id="key"
          name="key"
          type="password"
          tip="Skip this field to retain the current key."
          placeholder="Control Key"
          onChange={handleInputChange}
        />
        <div className="flex flex-wrap gap-2">
          <Button
            type="submit"
            className="bg-neutral-900 text-neutral-100">
            <i className="far fa-save" />
            Save Blog
          </Button>
        </div>
      </form>
    </DashboardContent>
  );
}
