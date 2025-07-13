"use client";

import { initializeIdentity } from "@/actions/identity/initialize-identity";
import useIsOnMobile from "@/hooks/useIsOnMobile";
import { useCallback, useEffect, useState } from "react";
import { Main } from "./Main";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

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
