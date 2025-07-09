"use client";

import { useState } from "react";
import Button from "./Button";

interface LikeButtonProps extends Pick<Blog, "id"> {
  className?: string;
}

export default function LikeButton({ id, className }: LikeButtonProps) {
  const [likes, setLikes] = useState("100");
  const [isLiked, setIsLiked] = useState(true);

  void id;
  void setLikes;
  void setIsLiked;

  const unlikedStyle = "bg-blue-500/30 text-blue-500";
  const likedStyle = "bg-blue-500 text-neutral-100";
  const classes = `${isLiked ? likedStyle : unlikedStyle} ${className}`.trim();

  return (
    <Button className={classes}>
      <i className="far fa-thumbs-up" />
      {likes}
    </Button>
  );
}
