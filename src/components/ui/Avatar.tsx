"use client";

import ReactNiceAvatar, { genConfig } from "react-nice-avatar";

interface AvatarProviderProps {
  size: string;
  seed: string;
}

export default function Avatar({ size, seed }: AvatarProviderProps) {
  const config = genConfig(seed);

  return (
    <ReactNiceAvatar
      {...config}
      className={`aspect-square ${size}`}
    />
  );
}
