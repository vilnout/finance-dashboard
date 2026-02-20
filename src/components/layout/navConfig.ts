import { LayoutDashboard, Receipt, BarChart3, Settings } from "lucide-react";

export const navItems = [
  { icon: LayoutDashboard, label: "DashBoard", view: "dashboard" },
  { icon: Receipt, label: "Transactions", view: "transactions" },
  { icon: BarChart3, label: "Analytics", view: "analytics" },
  { icon: Settings, label: "Settings", view: "settings" },
] as const;

export type View = (typeof navItems)[number]["view"];
export type NavItem = (typeof navItems)[number];
