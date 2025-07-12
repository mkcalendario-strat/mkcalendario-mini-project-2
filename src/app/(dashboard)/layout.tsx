"use client";

import { initializeIdentity } from "@/actions/identity/identity";
import Dashboard from "@/components/layouts/Dashboard";
import { useCallback, useEffect, useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [identity, setIdentity] = useState<boolean | null>(null);

  const checkIdentity = useCallback(async () => {
    await initializeIdentity();
    setIdentity(true);
  }, []);

  useEffect(() => {
    checkIdentity();
  }, [checkIdentity]);

  if (!identity) return null;

  return <Dashboard>{children}</Dashboard>;
}
