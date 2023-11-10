import { NavLink, useLocation } from "react-router-dom";
import { House, MagnifyingGlass, Bell, EnvelopeSimple, IconProps } from "@phosphor-icons/react";
import { useScrollDirection } from "../context/ScrollContext";

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
  const scrollDirection = useScrollDirection();
  return (
    <nav
      data-isscrolldown={scrollDirection === "down"}
      className="hidden dark:bg-bodyDark dark:border-grayBorderDark fixed bottom-0 w-full h-14 bg-white border-t-[1px] border-grayBorder sm:block transition-transform duration-200 data-[isscrolldown=true]:-translate-y-[-100%] "
    >
      <div className="flex items-center h-full justify-around">
        <NavLinkMobile to="/" icon={House} />
        <NavLinkMobile to="/explorer" icon={MagnifyingGlass} />
        <NavLinkMobile to="/notifications/all" icon={Bell} />
        <NavLinkMobile to="/messages" icon={EnvelopeSimple} />
      </div>
    </nav>
  );
}
