"use client";

import { DashboardContent } from "@/components/layouts/DashboardContent";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import WYSIWYGEditor from "@/components/ui/WYSIWYGEditor";

export default function CreateBlogForm() {
  const title = "Create Blog";
  const description = "Create and publish blogs that make sense.";

  return (
    <DashboardContent
      title={title}
      description={description}
      className="flex flex-col gap-3 bg-white p-10">
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
        <Button className="bg-neutral-900 text-neutral-100">
          <i className="far fa-check" />
          Publish Blog
        </Button>
      </div>
    </DashboardContent>
  );
}
