"use client";

import { getHearts } from "@/actions/blogs/blogs";
import sendHeart from "@/actions/interactions/interactions";
import Button from "@/components/ui/Button";
import { Blog } from "@/types/blogs";
import { showErrorToast } from "@/utils/toast";
import { useCallback, useEffect, useState } from "react";

interface HeartButtonProps extends Pick<Blog, "id"> {
  className?: string;
}

export default function HeartButton({ id, className }: HeartButtonProps) {
  const [heartsCount, setHeartsCount] = useState<number | string>("Hearts");

  const handleSendHeart = async () => {
    setHeartsCount((prev) => (prev as number) + 1);

    const { success, message, hearts } = await sendHeart(id);

    if (!success || !hearts) {
      showErrorToast(message);
      return null;
    }
  };

  const fetchHeartCount = useCallback(async () => {
    const { success, message, hearts } = await getHearts(id);

    if (!success || typeof hearts === "undefined") {
      showErrorToast(message);
      return null;
    }

    setHeartsCount(hearts);
  }, [id]);

  useEffect(() => {
    fetchHeartCount();
  }, [fetchHeartCount]);

  const baseClasses = "bg-violet-700 text-neutral-100";
  const classes = `${baseClasses} ${className}`.trim();

  return (
    <Button
      onClick={handleSendHeart}
      className={classes}>
      <i className="far fa-heart" />
      {heartsCount}
    </Button>
  );
}
