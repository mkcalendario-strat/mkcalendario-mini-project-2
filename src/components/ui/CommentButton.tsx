"use client";

import Button from "./Button";

interface CommentButtonProps extends Pick<Blog, "id"> {
  className?: string;
}

export default function CommentButton({ id, className }: CommentButtonProps) {
  void id;

  const baseClasses = "bg-blue-500 text-neutral-100";
  const classes = `${baseClasses} ${className}`.trim();

  return (
    <Button className={classes}>
      <i className="far fa-message" />
      Comment
    </Button>
  );
}
