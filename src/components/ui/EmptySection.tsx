import Image from "next/image";

type EmptySectionProps = {
  text: string;
  description: string;
  graphicsSrc: string;
};

export default function EmptySection({
  text,
  description,
  graphicsSrc
}: EmptySectionProps) {
  return (
    <div className="w-full bg-neutral-100 p-7 text-center">
      <div className="relative m-auto aspect-square max-w-[200px]">
        <Image
          fill
          alt={text}
          src={graphicsSrc}
          draggable={false}
          className="object-cover select-none"
        />
      </div>

      <div className="mt-3">
        <p className="text-3xl font-black">{text}</p>
        <p>{description}</p>
      </div>
    </div>
  );
}
