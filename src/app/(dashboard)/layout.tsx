import Dashboard from "@/components/layouts/Dashboard";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <Dashboard>{children}</Dashboard>;
}
