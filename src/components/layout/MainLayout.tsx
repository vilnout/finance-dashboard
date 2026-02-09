import type { ReactNode } from "react";
import SideBar from "./Sidebar";
import { Menu } from "lucide-react";

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen">
      <SideBar />

      {/* Mobile header */}
      <div className="flex items-center justify-between border-b border-slate-700 p-4 md:hidden">
        <div className="font-bold text-blue-500">Finance</div>
        <button className="font-bold">
          <Menu size={24} />
        </button>
      </div>

      <main className="p-4 md:ml-64 md:p-8">
        <div className="mx-auto max-w-7xl">{children}</div>
      </main>
    </div>
  );
}

export default MainLayout;
