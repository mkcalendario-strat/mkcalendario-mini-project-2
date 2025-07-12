import AvatarProvider from "./AvatarProvider";

interface IdentityProps extends Identity {
  reverse?: boolean;
  imageSize: string;
  description: string;
}

export default function Identity({
  reverse,
  imageSize,
  description,
  userName,
  userAvatarSeed
}: IdentityProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="aspect-square">
        <AvatarProvider
          size={imageSize}
          seed={userAvatarSeed}
        />
      </div>

      <div className={`flex ${reverse ? "flex-col-reverse" : "flex-col"}`}>
        <p className="leading-[18px] font-medium">{userName}</p>
        <p className="text-sm leading-[18px] text-neutral-700">{description}</p>
      </div>
    </div>
  );
}
