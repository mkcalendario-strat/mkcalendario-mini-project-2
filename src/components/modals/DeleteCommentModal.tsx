"use client";

import { deleteComment } from "@/actions/interactions/interactions";
import { UserComment } from "@/types/interactions";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";

interface DeleteCommentModalProps extends Pick<UserComment, "id"> {
  toggle: () => void;
}

export default function DeleteCommentModal({
  id,
  toggle
}: DeleteCommentModalProps) {
  const [key, setKey] = useState("");

  const handleDelete = async () => {
    const { success, message } = await deleteComment(id, key);
    if (!success) return showErrorToast(message);

    showSuccessToast(message);
    toggle();
  };

  return (
    <Modal
      toggle={toggle}
      title="Delete Comment"
      className="flex flex-col gap-2">
      <Input
        id="comment-key"
        type="password"
        placeholder="Enter Comment Key"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <Button
        onClick={handleDelete}
        className="self-baseline bg-red-700 text-neutral-100">
        <i className="far fa-trash" />
        Delete Comment
      </Button>
    </Modal>
  );
}
