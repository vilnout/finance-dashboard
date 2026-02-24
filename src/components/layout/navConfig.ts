import { LayoutDashboard, Receipt, BarChart3, Settings } from "lucide-react";

export const navItems = [
  { icon: LayoutDashboard, label: "DashBoard", path: "/dashboard" },
  { icon: Receipt, label: "Transactions", path: "/transactions" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Settings, label: "Settings", path: "/settings" },
] as const;

export type NavItem = (typeof navItems)[number];
