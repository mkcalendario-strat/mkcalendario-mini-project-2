"use client";

import Button from "./Button";

interface LikeButtonProps extends Pick<Blog, "id"> {
  className?: string;
}

export default function HeartButton({ id, className }: LikeButtonProps) {
  void id;
  const hearts = 100;

  const baseClasses = "bg-violet-500 text-neutral-100";
  const classes = `${baseClasses} ${className}`.trim();

  return (
    <Button className={classes}>
      <i className="far fa-heart" />
      {hearts}
    </Button>
  );
}
