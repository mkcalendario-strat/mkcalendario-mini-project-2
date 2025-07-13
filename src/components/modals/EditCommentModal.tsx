"use client";

import { editComment, fetchComment } from "@/actions/interactions/interactions";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Modal from "@/components/ui/Modal";
import Textarea from "@/components/ui/Textarea";
import { UserComment } from "@/types/interactions";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useCallback, useEffect, useState } from "react";

interface EditCommentModalProps extends Pick<UserComment, "id"> {
  toggle: () => void;
}

export default function EditCommentModal({
  id,
  toggle
}: EditCommentModalProps) {
  const [formData, setFormData] = useState({ key: "", editedComment: "" });

  const fetchCommentData = useCallback(async () => {
    const { success, message, data } = await fetchComment(id);
    if (!success || !data) return showErrorToast(message);
    setFormData((prev) => ({ ...prev, editedComment: data.text }));
  }, [id]);

  useEffect(() => {
    fetchCommentData();
  }, [fetchCommentData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = async () => {
    const { key, editedComment } = formData;
    const { success, message } = await editComment({
      id: id,
      key,
      text: editedComment
    });
    if (!success) return showErrorToast(message);
    showSuccessToast(message);
    toggle();
    setFormData({ key: "", editedComment: "" });
  };

  return (
    <Modal
      toggle={toggle}
      title="Edit Comment"
      className="flex flex-col gap-2">
      <Textarea
        id="edited-comment"
        name="editedComment"
        placeholder="Comment"
        value={formData.editedComment}
        onChange={handleChange}
      />
      <Input
        id="desired-key"
        type="password"
        name="key"
        placeholder="Enter Comment Key"
        value={formData.key}
        onChange={handleChange}
      />
      <Button
        onClick={handleEdit}
        className="self-baseline bg-green-700 text-neutral-100">
        <i className="far fa-check" />
        Save Edit
      </Button>
    </Modal>
  );
}
