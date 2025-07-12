"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import {
  Config,
  animals,
  colors,
  uniqueNamesGenerator
} from "unique-names-generator";
import { v4 as uuidv4 } from "uuid";

const IDENTITY = {
  USER_NAME: "user_name",
  USER_AVATAR_SEED: "user_avatar_seed"
};

export async function getIdentity() {
  const cookieStore = await cookies();

  return {
    userName:
      cookieStore.get(IDENTITY.USER_NAME)?.value ?? (await generateUserName()),
    userAvatarSeed:
      cookieStore.get(IDENTITY.USER_AVATAR_SEED)?.value ?? uuidv4()
  };
}

export async function createIdentity({ userName, userAvatarSeed }: Identity) {
  const cookieStore = await cookies();
  cookieStore.set(IDENTITY.USER_NAME, userName, { httpOnly: true });
  cookieStore.set(IDENTITY.USER_AVATAR_SEED, userAvatarSeed, {
    httpOnly: true
  });

  revalidatePath("/");
}

export async function generateUserName() {
  const customConfig: Config = {
    dictionaries: [colors, animals],
    separator: "-"
  };

  return uniqueNamesGenerator(customConfig);
}

export async function generateAvatarSeed() {
  return uuidv4();
}
