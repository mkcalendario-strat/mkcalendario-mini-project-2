import Navbar from "@/components/ui/Navbar";
import Image from "next/image";
import { Fragment } from "react";

export default function NotFound() {
  return (
    <Fragment>
      <Navbar />
      <div className="flex min-h-[calc(100vh-65px)] flex-col items-center justify-center px-4 text-center">
        {/* Image */}
        <Image
          width="250"
          height="250"
          alt="Unauthorized"
          src="/assets/images/graphics/unauthorized.png"
        />

        {/* Large Text */}
        <h1 className="mb-4 text-2xl font-bold text-neutral-900 md:text-4xl">
          Forbidden
        </h1>

        {/* Description */}
        <p className="max-w-md text-sm text-neutral-600 md:text-base">
          Sorry, you are forbidden to access this page.
        </p>
      </div>
    </Fragment>
  );
}
