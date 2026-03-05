import { LayoutDashboard, PieChart, Receipt, Settings } from "lucide-react";
import { ROUTES } from "../../routes/routes";

export const navItems = [
  { icon: LayoutDashboard, label: "DashBoard", path: ROUTES.DASHBOARD },
  { icon: Receipt, label: "Transactions", path: ROUTES.TRANSACTIONS },
  { icon: PieChart, label: "Budgets", path: ROUTES.BUDGETS },
  { icon: Settings, label: "Settings", path: ROUTES.SETTINGS },
] as const;

export type NavItem = (typeof navItems)[number];
