"use client";

import { editComment, fetchComment } from "@/actions/interactions";
import { showErrorToast, showSuccessToast } from "@/utils/toast";
import { Fragment, useCallback, useEffect, useState } from "react";
import AvatarProvider from "../providers/AvatarProvider";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import Textarea from "./Textarea";

export default function Comment({
  id,
  userName,
  userAvatarSeed,
  timestamp,
  text
}: CommentsData) {
  return (
    <div className="relative flex flex-col gap-3 bg-white p-[20px]">
      <div className="flex flex-wrap gap-2">
        <AvatarProvider
          seed={userAvatarSeed}
          size="w-[40px]"
        />
        <div className="">
          <p className="leading-[20px] font-medium">{userName}</p>
          <p className="text-xs leading-[20px] text-neutral-600">{timestamp}</p>
        </div>
      </div>

      <div className="absolute top-0 right-0 m-[20px] flex flex-wrap gap-1">
        <EditCommentButton id={id} />
        <TrashCommentButton id={id} />
      </div>

      <p className="text-sm">{text}</p>
    </div>
  );
}

type TrashCommentButtonProps = Pick<UserComment, "id">;

function TrashCommentButton({ id }: TrashCommentButtonProps) {
  void id;
  const [key, setKey] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleKeyChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setKey(evt.target.value);
  };

  const toggleModal = () => setIsModalVisible((prev) => !prev);

  return (
    <Fragment>
      <button
        onClick={toggleModal}
        className="cursor-pointer">
        <i className="far fa-trash text-red-500" />
      </button>

      <Modal
        title="Delete Comment"
        toggle={toggleModal}
        visible={isModalVisible}
        className="flex flex-col gap-2">
        <Input
          id="comment-key"
          type="password"
          name="key"
          value={key}
          onChange={handleKeyChange}
          placeholder="Enter Comment Key"
        />
        <Button className="self-baseline bg-red-500 text-neutral-100">
          <i className="far fa-trash" />
          Delete Comment
        </Button>
      </Modal>
    </Fragment>
  );
}

type EditCommentButtonProps = Pick<UserComment, "id">;

function EditCommentButton({ id }: EditCommentButtonProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const initialFormData = { key: "", editedComment: "" };
  const [formData, setFormData] = useState(initialFormData);

  const handleEditComment = async () => {
    const { key, editedComment } = formData;
    const { success, message } = await editComment({
      id,
      key,
      text: editedComment
    });

    if (!success) return showErrorToast(message);

    toggleModal();
    setFormData(initialFormData);
    return showSuccessToast(message);
  };

  const handleInputChange = (
    evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchCommentData = useCallback(async () => {
    const { success, message, data } = await fetchComment(id);

    if (!success || !data) return showErrorToast(message);

    setFormData((prev) => ({ ...prev, editedComment: data.text }));
  }, [id]);

  const toggleModal = () => setIsModalVisible((prev) => !prev);

  useEffect(() => {
    if (isModalVisible) fetchCommentData();
  }, [isModalVisible, fetchCommentData]);

  return (
    <Fragment>
      <button
        onClick={toggleModal}
        className="cursor-pointer">
        <i className="far fa-edit text-green-500" />
      </button>

      <Modal
        title="Edit Comment"
        toggle={toggleModal}
        visible={isModalVisible}
        className="flex flex-col gap-2">
        <Textarea
          id="comment-key"
          name="editedComment"
          placeholder="Comment"
          value={formData.editedComment}
          onChange={handleInputChange}
        />
        <Input
          id="comment-key"
          type="password"
          name="key"
          placeholder="Enter Comment Key"
          value={formData.key}
          onChange={handleInputChange}
        />
        <Button
          onClick={handleEditComment}
          className="self-baseline bg-green-500 text-neutral-100">
          <i className="far fa-edit" />
          Edit Comment
        </Button>
      </Modal>
    </Fragment>
  );
}
