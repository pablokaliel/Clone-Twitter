import { NavLink, useLocation } from "react-router-dom";
import {
  House,
  MagnifyingGlass,
  Bell,
  EnvelopeSimple,
  IconProps,
} from "@phosphor-icons/react";

interface NavLinkMobileProps {
  to: string;
  icon: React.ElementType<IconProps>;
}

export function NavLinkMobile({ to, icon: Icon }: NavLinkMobileProps) {
  const location = useLocation();
  const isActive = location.pathname.split("/", 2).join("/") === to;

  return (
    <NavLink to={to} className="flex items-center h-full justify-center">
      <Icon
        size={24}
        weight={isActive ? "fill" : "regular"}
        className={`${isActive ? "text-twitterBlue" : ""}`}
      />
    </NavLink>
  );
}

export function BottomMobile() {
  return (
    <nav className="hidden fixed bottom-0 w-full h-14 bg-white border-t-[1px] border-grayBorder dark:bg-bodyDark dark:border-grayBorderDark sm:block">
      <div className="flex items-center h-full justify-around">
        <NavLinkMobile to="/" icon={House} />
        <NavLinkMobile to="/explorer" icon={MagnifyingGlass} />
        <NavLinkMobile to="/notifications" icon={Bell} />
        <NavLinkMobile to="/messages" icon={EnvelopeSimple} />
      </div>
    </nav>
  );
}
