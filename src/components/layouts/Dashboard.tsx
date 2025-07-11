"use client";

import { initializeIdentity } from "@/actions/identity/identity";
import { getIdentity } from "@/actions/utils/identity";
import useIsOnMobile from "@/hooks/useIsOnMobile";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import ChangeIdentityModal from "../misc/ChangeIdentityButton";
import Identity from "../providers/Identity";

// Dashboard

interface DashboardProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  const [identity, setIdentity] = useState<boolean | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isOnMobile = useIsOnMobile();

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const checkIdentity = useCallback(async () => {
    await initializeIdentity();
    setIdentity(true);
  }, []);

  useEffect(() => {
    setIsSidebarOpen(isOnMobile !== null && isOnMobile !== true);
  }, [isOnMobile]);

  useEffect(() => {
    checkIdentity();
  }, [checkIdentity]);

  if (!identity) return null;

  return (
    <section className="dashboard-grid relative min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <Main>{children}</Main>
    </section>
  );
}

// Dashboard Navbar

interface NavbarProps {
  toggleSidebar: () => void;
}

function Navbar({ toggleSidebar }: NavbarProps) {
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

// Dashboard Sidebar

interface SidebarProps {
  isOpen: boolean;
}

const LINKS = [
  { label: "Home", path: "/", icon: "fa-house" },
  { label: "Blogs", path: "/blogs", icon: "fa-blog" },
  { label: "Manage Blog", path: "/blogs/manage", icon: "fa-bars-progress" },
  { label: "Create Blogs", path: "/blogs/create", icon: "fa-square-plus" }
];

function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const [identity, setIdentity] = useState<Identity>({
    userName: "",
    userAvatarSeed: ""
  });
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => setIsModalVisible((prev) => !prev);

  const baseClasses = "flex font-medium items-center gap-3 px-5 py-3";
  const activeClasses = "text-neutral-100 bg-neutral-900";
  const inactiveClasses = "text-neutral-900 hover:bg-neutral-100";

  const fetchIdentity = useCallback(async () => {
    const identity = await getIdentity();
    setIdentity(identity);
  }, []);

  useEffect(() => {
    fetchIdentity();
  }, [fetchIdentity]);

  if (!isOpen) return null;

  return (
    <aside className="dashboard-sidebar fixed top-[65px] z-[1] h-full w-full bg-white md:w-[88px] lg:w-[300px]">
      <div className="flex h-full flex-col gap-1 overflow-y-auto p-[15px]">
        {LINKS.map(({ label, path, icon }, i) => {
          const isActive = pathname === path;

          return (
            <Link
              key={i}
              href={path}
              className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}>
              <i className={`far ${icon}`} />
              <span className="block md:hidden lg:block">{label}</span>
            </Link>
          );
        })}

        <div className="flex justify-between gap-2 bg-neutral-100 p-[10px]">
          <Identity
            reverse
            imageSize="w-[35px]"
            description="Identified as"
            userName={identity.userName}
            userAvatarSeed={identity.userAvatarSeed}
          />
          <button
            onClick={toggleModal}
            className="cursor-pointer">
            <i className="fas fa-grid-2 text-neutral-900" />
          </button>
          <ChangeIdentityModal
            toggle={toggleModal}
            visible={isModalVisible}
            refetch={fetchIdentity}
          />
        </div>
      </div>
    </aside>
  );
}

// Dashboard Main Content

interface MainProps {
  children: React.ReactNode;
}

function Main({ children }: MainProps) {
  return <main className="dashboard-main py-[15px]">{children}</main>;
}
