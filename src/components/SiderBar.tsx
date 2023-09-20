import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  House,
  Hash,
  Bell,
  EnvelopeSimple,
  BookmarkSimple,
  File,
  User,
  DotsThreeCircle,
  TwitterLogo,
  DotsThree,
} from "@phosphor-icons/react";

const links = [
  { id: "", name: "Home", icon: <House size={32} /> },
  { id: "explore", name: "Explore", icon: <Hash size={32} /> },
  { id: "notifications", name: "Notifications", icon: <Bell size={32} /> },
  { id: "messages", name: "Messages", icon: <EnvelopeSimple size={32} /> },
  { id: "bookmarks", name: "Bookmarks", icon: <BookmarkSimple size={32} /> },
  { id: "lists", name: "Lists", icon: <File size={32} /> },
  { id: "profile", name: "Profile", icon: <User size={32} /> },
  { id: "more", name: "More", icon: <DotsThreeCircle size={32} /> },
];
interface SideBarProps {
  userName: string;
  userLogin: string;
}

function SideBar(props: SideBarProps) {
  const [focusedLinks, setFocusedLinks] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleLinkFocus = (linkId: string) => {
    setFocusedLinks((prevFocusedLinks) => ({
      ...prevFocusedLinks,
      [linkId]: true,
    }));
  };

  const handleLinkBlur = (linkId: string) => {
    setFocusedLinks((prevFocusedLinks) => ({
      ...prevFocusedLinks,
      [linkId]: false,
    }));
  };

  const isLinkFocused = (linkId: string) => {
    return focusedLinks[linkId];
  };

  return (
    <aside className="pt-6 px-5 flex flex-col md:items-center justify-between h-screen sticky top-0 md:px-0 sm:hidden">
      <div className="flex flex-col  gap-8">
        <Link
          className="flex justify-center items-center w-fit text-xl font-bold rounded-full py-2 px-2 hover:bg-zinc-100"
          to={"/"}
        >
          <TwitterLogo weight="fill" size={32} color="#1da1f2" />
        </Link>
        <nav className="flex flex-col gap-1 ">
          {links.map((link) => (
            <Link
              key={link.id}
              className="flex items-center gap-5 w-fit text-xl font-bold rounded-full py-2 pl-2 pr-6 hover:bg-zinc-100 hover:dark:bg-zinc-800 md:p-2 active:text-twitterBlue"
              to={`/${link.id}`}
              onFocus={() => handleLinkFocus(link.id)}
              onBlur={() => handleLinkBlur(link.id)}
            >
              {isLinkFocused(link.id)
                ? React.cloneElement(link.icon, { weight: "fill" })
                : React.cloneElement(link.icon, { weight: "regular" })}
              {link.name} {/* Nome do link */}
            </Link>
          ))}
        </nav>

        <button className="bg-twitterBlue rounded-full flex justify-center items-center w-full text-white text-lg font-bold border-0 p-4 hover:brightness-90 transition-all">
          Tweet
        </button>
      </div>

      <div
        className="p-4 flex items-center gap-3 my-3 rounded-full transition-colors duration-200 select-none cursor-pointer
        md:w-16 md:h-16 md:p-3 
        data-[istouchsupported=false]:hover:bg-zinc-100 
        data-[istouchsupported=false]:hover:dark:bg-zinc-800"
      >
        <img
          src="https://github.com/pabloKaliel.png"
          alt="Foto de perfil do usuário"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex flex-1 justify-between items-center md:hidden">
          <div className="flex flex-col flex-shrink-0 text-sm">
            <span className="font-bold">{props.userName}</span>
            <span className="opacity-70 dark:opacity-50">
              @{props.userLogin}
            </span>
          </div>
          <div>
            <DotsThree weight="bold" size={18.75} />
          </div>
        </div>
      </div>
    </aside>
  );
}

export default SideBar;
