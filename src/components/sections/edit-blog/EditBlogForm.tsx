"use client";

import { DashboardContent } from "@/components/layouts/DashboardContent";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import WYSIWYGEditor from "@/components/ui/WYSIWYGEditor";

export default function EditBlogForm() {
  return (
    <DashboardContent
      title="Edit Blog"
      className="flex flex-col gap-3 bg-white p-10"
      description="You can now edit this blog.">
      <Input
        id="title"
        placeholder="Title"
      />
      <Input
        id="description"
        placeholder="Description"
      />
      <WYSIWYGEditor
        id="content"
        placeholder="Blog Content"
        onChange={(v: string) => console.log(v)}
      />
      <Input
        id="image"
        type="file"
        accept="image/jpeg,image/png"
        placeholder="Image"
      />

      <div className="flex flex-wrap gap-2">
        <Button className="bg-green-700 text-neutral-100">
          <i className="far fa-trash" />
          Save Edits
        </Button>
        <Button className="bg-neutral-100 text-red-500">
          <i className="far fa-trash" />
          Delete Permanently
        </Button>
      </div>
    </DashboardContent>
  );
}
