"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function useUserData() {
  const [userName, setUserName] = useState("");
  const [userAvatarSeed, setUserAvatarSeed] = useState("");

  useEffect(() => {
    const name = Cookies.get("user_name");
    const seed = Cookies.get("user_avatar_seed");

    setUserName(name ?? "Anonymous");
    setUserAvatarSeed(seed ?? "Anonymous");
  }, []);

  return { userName, userAvatarSeed };
}
