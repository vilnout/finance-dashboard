import { Outlet } from "react-router-dom";
import { ToastContainer } from "../ui/ToastContainer";
import { MobileNav } from "./MobileNav";
import SideBar from "./Sidebar";

function MainLayout() {
  return (
    <div className="min-h-screen">
      <SideBar />
      <MobileNav />
      <ToastContainer />

      <main className="p-4 pb-25 md:ml-64 md:p-8">
        <div className="mx-auto max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MainLayout;
