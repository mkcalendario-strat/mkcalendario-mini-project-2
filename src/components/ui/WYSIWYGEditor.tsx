import dynamic from "next/dynamic";
import { ChangeEvent } from "react";
import "react-quill-new/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface WYSIWYGEditorProps {
  id: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function WYSIWYGEditor({
  id,
  name,
  placeholder,
  value,
  onChange
}: WYSIWYGEditorProps) {
  const handleChange = (content: string) => {
    const fakeEvent = {
      target: { name, value: content }
    } as ChangeEvent<HTMLInputElement>;

    onChange(fakeEvent);
  };

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-lg font-medium">
        {placeholder}
      </label>

      <ReactQuill
        value={value}
        onChange={handleChange}
        className="border-2"
        theme="snow"
      />

      {/* Hidden input to make it submit with FormData */}
      <input
        id={id}
        type="hidden"
        name={name}
        value={value}
      />
    </div>
  );
}
