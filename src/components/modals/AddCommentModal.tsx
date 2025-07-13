import { addComment } from "@/actions/interactions/interactions";
import useUserData from "@/hooks/useUserData";
import { Blog } from "@/types/blogs";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { useState } from "react";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Modal from "../ui/Modal";
import Textarea from "../ui/Textarea";

interface AddCommentModalProps {
  toggle: () => void;
  id: Blog["id"];
}
export function AddCommentModal({ id, toggle }: AddCommentModalProps) {
  const { userName, userAvatarSeed } = useUserData();
  const [formData, setFormData] = useState({ comment: "", desiredKey: "" });

  const handleInputChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitCommentClick = async () => {
    const { success, message } = await addComment({
      blogId: id,
      text: formData.comment,
      desiredKey: formData.desiredKey
    });

    if (!success) return showErrorToast(message);

    toggle();
    setFormData({ comment: "", desiredKey: "" });
    return showSuccessToast(message);
  };

  return (
    <Modal
      toggle={toggle}
      title="Add Comment"
      className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-3">
        <Avatar
          seed={userAvatarSeed}
          size="w-[35px]"
        />
        <p className="font-medium">{userName}</p>
      </div>
      <Textarea
        id="comment"
        name="comment"
        placeholder="Comment"
        value={formData.comment}
        onChange={handleInputChange}
      />
      <Input
        id="desired-key"
        name="desiredKey"
        placeholder="Desired Key"
        value={formData.desiredKey}
        onChange={handleInputChange}
        tip="Keep this key to edit or delete comment."
        type="password"
      />
      <Button
        onClick={handleSubmitCommentClick}
        className="self-baseline bg-sky-700 text-neutral-100">
        Comment
      </Button>
    </Modal>
  );
}
