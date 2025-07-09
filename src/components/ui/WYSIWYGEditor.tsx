"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface WYSIWYGEditorProps {
  id: string;
  placeholder: string;
  onChange: (content: string) => void;
}

export default function WYSIWYGEditor({
  id,
  placeholder,
  onChange
}: WYSIWYGEditorProps) {
  const [value, setValue] = useState<string>("");

  const handleChange = (content: string) => {
    setValue(content);
    onChange(content);
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-lg font-medium">
        {placeholder}
      </label>
      <ReactQuill
        id={id}
        theme="snow"
        value={value}
        className="border-2"
        onChange={handleChange}
      />
    </div>
  );
}
