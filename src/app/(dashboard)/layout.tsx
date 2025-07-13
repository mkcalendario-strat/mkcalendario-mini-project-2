import Dashboard from "@/components/layouts/Dashboard/Dashboard";

export async function generateMetadata() {
  return {
    title: {
      default: "Large",
      template: "%s | Large"
    },
    description:
      "A space for a sensible thoughts and ideas larger than any medium."
  };
}

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return <Dashboard>{children}</Dashboard>;
}
