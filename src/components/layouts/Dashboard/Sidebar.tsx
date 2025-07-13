"use client";

import { getIdentity } from "@/actions/utils/identity";
import ChangeIdentityModal from "@/components/modals/ChangeIdentityModal";
import Identity from "@/components/ui/Identity";
import { Identity as IdentityT } from "@/types/identity";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface SidebarProps {
  isOpen: boolean;
}

const LINKS = [
  { label: "Home", path: "/", icon: "fa-house" },
  { label: "Blogs", path: "/blogs", icon: "fa-blog" },
  { label: "Manage Blog", path: "/blogs/manage", icon: "fa-bars-progress" },
  { label: "Create Blogs", path: "/blogs/create", icon: "fa-square-plus" }
];

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();
  const [identity, setIdentity] = useState<IdentityT>({
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

          {isModalVisible && (
            <ChangeIdentityModal
              toggle={toggleModal}
              visible={isModalVisible}
              refetch={fetchIdentity}
            />
          )}
        </div>
      </div>
    </aside>
  );
}
