"use client";

import { addComment } from "@/actions/interactions";
import useUserData from "@/hooks/useUserData";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { Fragment, useState } from "react";
import AvatarProvider from "../providers/AvatarProvider";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import Textarea from "./Textarea";

interface CommentButtonProps extends Pick<Blog, "id"> {
  className?: string;
}

export default function CommentButton({ id, className }: CommentButtonProps) {
  void id;
  const [isVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => setIsModalVisible((prev) => !prev);

  const baseClasses = "bg-blue-500 text-neutral-100";
  const classes = `${baseClasses} ${className}`.trim();

  return (
    <Fragment>
      <Button
        className={classes}
        onClick={toggleModal}>
        <i className="far fa-message" />
        Comment
      </Button>

      <AddCommentModal
        id={id}
        visible={isVisible}
        toggle={toggleModal}
      />
    </Fragment>
  );
}

interface AddCommentModalProps {
  visible: boolean;
  toggle: () => void;
  id: Blog["id"];
}

function AddCommentModal({ id, visible, toggle }: AddCommentModalProps) {
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
      visible={visible}
      toggle={toggle}
      title="Add Comment"
      className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-3">
        <AvatarProvider
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
        className="self-baseline bg-neutral-900 text-neutral-100">
        Submit Comment
      </Button>
    </Modal>
  );
}
