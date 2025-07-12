"use client";

import { getIdentity } from "@/actions/utils/identity";
import { Identity } from "@/types/identity";
import { useCallback, useEffect, useState } from "react";

export default function useUserData() {
  const [identity, setIdentity] = useState<Identity>({
    userName: "",
    userAvatarSeed: ""
  });

  const fetchUserData = useCallback(async () => {
    const identity = await getIdentity();
    setIdentity(identity);
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return identity;
}
