import LinkButton from "@/components/ui/LinkButton";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="container">
        <div className="flex min-h-[calc(100vh-51px)] flex-col justify-center">
          <div className="flex flex-col items-center gap-[50px] py-[50px] md:flex-row">
            <div className="md:w-[55%]">
              <h1 className="mb-3 text-5xl font-bold tracking-tighter lg:text-7xl">
                Stories and ideas larger than any medium.
              </h1>
              <p className="mb-5 text-xl">
                Your freedom in posting and reading ideas. Do it anonymously.
              </p>
              <LinkButton
                href="/blogs"
                className="bg-neutral-900 text-neutral-100">
                Browse Blogs
                <i className="far fa-arrow-right" />
              </LinkButton>
            </div>

            <div className="relative aspect-square w-full md:absolute md:right-[-150px] md:w-[45%]">
              <Image
                fill
                alt="hero avatar"
                className="object-cover"
                sizes="(min-width: 768px) 100vw, 75vw"
                src="/assets/images/graphics/people-puzzle.png"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
