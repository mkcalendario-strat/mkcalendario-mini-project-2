import Image from "next/image";
import Link from "next/link";

const LINKS = [
  { label: "Home", path: "/" },
  { label: "Blogs", path: "/blogs" }
];

export default function Navbar() {
  return (
    <nav className="relative border-b-1 border-neutral-100 bg-neutral-900 py-3">
      <div className="container">
        <div className="flex items-center justify-between">
          <div className="relative aspect-square w-[40px]">
            <Image
              fill
              alt="brand logo"
              className="object-cover"
              src="/assets/images/logos/light.svg"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>

          <div className="flex gap-5">
            {LINKS.map((link, i) => (
              <Link
                key={i}
                href={link.path}
                className="text-lg font-bold text-neutral-100">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
