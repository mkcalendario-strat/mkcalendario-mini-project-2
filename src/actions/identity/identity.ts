"use server";

import {
  createIdentity,
  generateAvatarSeed,
  generateUserName,
  hasIdentity
} from "../utils/identity";

export async function initializeIdentity() {
  if (await hasIdentity()) return;

  const userName = await generateUserName();
  const userAvatarSeed = await generateAvatarSeed();

  await createIdentity({ userName, userAvatarSeed });
}
