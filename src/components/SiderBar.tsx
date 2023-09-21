import { NavLink } from "react-router-dom";
import {
  Bell,
  TwitterLogo,
  BookmarkSimple,
  DotsThreeCircle,
  Envelope,
  FileText,
  Hash,
  House,
  Pencil,
  User,
} from "@phosphor-icons/react";

export function Sidebar() {
  return (
    <aside className="py-6 px-5 flex flex-col gap-8 md:items-center">
      <TwitterLogo color="" className="w-8 h-8" />

      <nav className="flex flex-col gap-8">
        <NavLink to="/" className="flex items-center gap-5 text-xl font-bold">
          <House className="w-8 h-8" weight="fill" />
          <span className="md:hidden">Home</span>
        </NavLink>
        <NavLink
          to={"/explorer"}
          className="flex items-center gap-5 text-xl font-bold"
        >
          <Hash className="w-8 h-8" />
          <span className="md:hidden">Explorer</span>
        </NavLink>
        <NavLink
          to={"/notifications"}
          className="flex items-center gap-5 text-xl font-bold"
        >
          <Bell className="w-8 h-8" />
          <span className="md:hidden">Notifications</span>
        </NavLink>
        <NavLink
          to={"/messages"}
          className="flex items-center gap-5 text-xl font-bold"
        >
          <Envelope className="w-8 h-8" />
          <span className="md:hidden">Messages</span>
        </NavLink>
        <NavLink
          to={"/bookmarks"}
          className="flex items-center gap-5 text-xl font-bold"
        >
          <BookmarkSimple className="w-8 h-8" />
          <span className="md:hidden">Bookmarks</span>
        </NavLink>
        <NavLink
          to={"/lists"}
          className="flex items-center gap-5 text-xl font-bold"
        >
          <FileText className="w-8 h-8" />
          <span className="md:hidden">Lists</span>
        </NavLink>
        <NavLink
          to={"/profile"}
          className="flex items-center gap-5 text-xl font-bold"
        >
          <User className="w-8 h-8" />
          <span className="md:hidden">Profile</span>
        </NavLink>
        <NavLink
          to={"/more"}
          className="flex items-center gap-5 text-xl font-bold"
        >
          <DotsThreeCircle className="w-8 h-8" />
          <span className="md:hidden">More</span>
        </NavLink>
      </nav>

      <button className="bg-twitterBlue rounded-full p-4 flex justify-center w-full text-white text-xl font-black hover:brightness-90 md:p-2">
        <Pencil className="w-6 h-6" />
        <span className="md:hidden">Tweet</span>
      </button>
    </aside>
  );
}
