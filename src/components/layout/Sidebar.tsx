import { LogOut } from "lucide-react";
import { navItems } from "./navConfig";
import { type View } from "./navConfig";

type SidebarProp = {
  currentView: View;
  onNavigate: (view: View) => void;
};

function SideBar({ currentView, onNavigate }: SidebarProp) {
  const handleClick = (view: View): void => {
    onNavigate(view);
  };

  return (
    <aside className="fixed top-0 left-0 hidden h-screen flex-col gap-5 border-r-2 border-slate-700 bg-slate-800 md:flex">
      <div className="p-6">
        <h1 className="flex items-center gap-2 text-2xl font-bold text-blue-500">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-lg text-white">
            F
          </div>
          Finance
        </h1>
      </div>
      <nav className="flex flex-1 flex-col gap-2">
        {navItems.map((Item) => {
          return (
            <button
              key={Item.label}
              onClick={() => handleClick(Item.view)}
              className={`mx-5 my-1 flex items-center gap-2 rounded-md px-8 py-3 transition-colors ${
                Item.view === currentView
                  ? "bg-blue-500 font-extrabold"
                  : "font-semibold text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Item.icon size={20} />
              <span>{Item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="border-t border-slate-700 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-400 transition-colors hover:bg-slate-900 hover:text-red-400">
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default SideBar;
