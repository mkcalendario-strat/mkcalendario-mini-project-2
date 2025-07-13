import { UserComment } from "./interactions";

export type Identity = Pick<UserComment, "userName" | "userAvatarSeed">;
