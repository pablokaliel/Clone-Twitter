import { IconProps } from "@phosphor-icons/react";
import { NavLink, useLocation } from "react-router-dom";

interface LinkSidebarProps {
  path: string;
  icon: React.ElementType<IconProps>;
  text: string;
  isNotAlink?: boolean;
}

export function LinkSidebar({ path, icon: Icon, text, isNotAlink }: LinkSidebarProps) {
  const location = useLocation();
  const isActive = location.pathname.split("/", 2).join("/") === path;

  return (
    <>
      {isNotAlink ? (
        <div
          data-isactive={isActive}
          className="flex items-center gap-5 w-fit text-xl font-bold rounded-full py-2 pl-2 pr-6 md:p-2 cursor-pointer hover:bg-zinc-100  hover:dark:bg-zinc-800 
          data-[isactive=true]:active"
        >
          <Icon size={32} weight={isActive ? "fill" : "regular"} />
          <span className="md:hidden">{text}</span>
        </div>
      ) : (
        <NavLink
          to={path}
          data-isactive={isActive}
          className="flex items-center gap-5 w-fit text-xl font-bold rounded-full py-2 pl-2 pr-6 md:p-2  hover:bg-zinc-100  hover:dark:bg-zinc-800 
          data-[isactive=true]:active"
        >
          <Icon size={32} weight={isActive ? "fill" : "regular"} />
          <span className="md:hidden">{text}</span>
        </NavLink>
      )}
    </>
  );
}
