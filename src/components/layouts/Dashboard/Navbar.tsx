"use client";

import Image from "next/image";

interface NavbarProps {
  toggleSidebar: () => void;
}

export default function Navbar({ toggleSidebar }: NavbarProps) {
  return (
    <nav className="dashboard-nav fixed top-0 left-0 z-[1] w-full bg-neutral-900 p-[15px]">
      <div className="flex justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            alt="user"
            width={35}
            height={35}
            src="/assets/images/logos/light.svg"
          />
          <p className="font-medium text-neutral-100">Large</p>
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="block cursor-pointer text-neutral-100 md:hidden">
          <i className="far fa-bars" />
        </button>
      </div>
    </nav>
  );
}
