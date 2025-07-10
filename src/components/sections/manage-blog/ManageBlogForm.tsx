"use client";

import deleteBlog from "@/actions/delete-blog";
import checkBlogKey from "@/actions/edit-blog";
import { DashboardContent } from "@/components/layouts/DashboardContent";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { redirect, RedirectType } from "next/navigation";
import { useState } from "react";

export default function ManageBlogForm() {
  const [formData, setFormData] = useState({
    id: "",
    key: ""
  });

  const handleDelete = async () => {
    const { id, key } = formData;
    const { success, message } = await deleteBlog(id, key);

    if (!success) {
      showErrorToast(message);
      return null;
    }

    showSuccessToast(message);
    setFormData({ id: "", key: "" });
  };

  const handleEdit = async () => {
    const { id, key } = formData;

    // Challenge control key
    const { success, message } = await checkBlogKey(id, key);

    if (!success) {
      return showErrorToast(message);
    }

    showSuccessToast(message);
    const url = `/blogs/edit/${id}/${key}`;
    redirect(url, RedirectType.push);
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <DashboardContent
      title="Manage Blogs"
      className="flex flex-col gap-2 bg-white p-7 shadow-sm"
      description="Edit or delete blogs using a blog key.">
      <p>
        You have the ability to edit or delete blogs, but only when you possess
        the unique key associated with a specific blog entry.
      </p>
      <Input
        id="blog-id"
        name="id"
        placeholder="Blog ID"
        value={formData.id}
        onChange={handleInputChange}
      />
      <Input
        id="key"
        name="key"
        placeholder="Blog Key"
        value={formData.key}
        onChange={handleInputChange}
      />

      <div className="flex flex-wrap gap-2">
        <Button
          onClick={handleDelete}
          className="bg-red-500 text-neutral-100">
          <i className="far fa-trash" />
          Delete
        </Button>
        <Button
          onClick={handleEdit}
          className="bg-green-700 text-neutral-100">
          <i className="far fa-edit" />
          Edit
        </Button>
      </div>
    </DashboardContent>
  );
}
