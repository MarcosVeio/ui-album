import type { Metadata } from "next";
import DashboardLayout from "@/components/DashboardLayout/DashboardLayout";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Área logada do sistema",
};

export default function DashboardRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
