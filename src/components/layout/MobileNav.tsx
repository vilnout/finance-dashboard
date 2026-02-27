import { NavLink } from "react-router-dom";
import { navItems } from "./navConfig";

export const MobileNav = () => {
  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 border-t border-slate-800 bg-slate-900 md:hidden">
      <div className="flex items-center justify-around px-2 py-3">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-xl p-2 transition-colors ${isActive ? "text-blue-500" : "text-slate-500 active:text-slate-300"}`
            }
          >
            <item.icon size={24} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
