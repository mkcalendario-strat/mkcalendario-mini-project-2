"use client";

import { Blog } from "@/types/blogs";
import { Fragment, useState } from "react";
import { AddCommentModal } from "../../../modals/AddCommentModal";
import Button from "../../../ui/Button";

interface CommentButtonProps extends Pick<Blog, "id"> {
  className?: string;
}

export default function CommentButton({ id, className }: CommentButtonProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

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

      {isModalVisible && (
        <AddCommentModal
          id={id}
          toggle={toggleModal}
        />
      )}
    </Fragment>
  );
}
