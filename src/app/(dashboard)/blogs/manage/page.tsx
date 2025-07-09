"use client";

import { DashboardContent } from "@/components/layouts/DashboardContent";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ManageBlog() {
  return (
    <DashboardContent
      tight
      title="Manage Blogs"
      className="flex flex-col gap-2 bg-white p-7 shadow-sm"
      description="Edit or delete blogs using a blog key.">
      <p>
        You have the ability to edit or delete blogs, but only when you possess
        the unique key associated with a specific blog entry.
      </p>
      <Input
        id="key"
        placeholder="Blog Key"
      />

      <div className="flex flex-wrap gap-2">
        <Button className="bg-red-500 text-neutral-100">
          <i className="far fa-trash" />
          Delete
        </Button>
        <Button className="bg-green-700 text-neutral-100">
          <i className="far fa-edit" />
          Edit
        </Button>
      </div>
    </DashboardContent>
  );
}
