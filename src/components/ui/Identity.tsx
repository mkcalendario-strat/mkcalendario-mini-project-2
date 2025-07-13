"use client";

import { useShouldHideOn } from "@/hooks/useShouldHideOn";
import { Identity as IdentityType } from "@/types/identity";
import Avatar from "./Avatar";

interface IdentityProps extends IdentityType {
  reverse?: boolean;
  hideOn?: Array<"xs" | "sm" | "md" | "lg" | "xl" | "2xl">;
  imageSize: string;
  description: string;
}

export default function Identity({
  reverse,
  hideOn,
  imageSize,
  description,
  userName,
  userAvatarSeed
}: IdentityProps) {
  const shouldHide = useShouldHideOn(hideOn);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Avatar
        size={imageSize}
        seed={userAvatarSeed}
      />

      {!shouldHide && (
        <div className={`flex ${reverse ? "flex-col-reverse" : "flex-col"}`}>
          <p className="leading-[18px] font-medium">{userName}</p>
          <p className="text-sm leading-[18px] text-neutral-700">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
