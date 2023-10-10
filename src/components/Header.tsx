import React, { useState, useEffect } from "react";
import { Users, BookmarkSimple, File, TwitterLogo, User, Sparkle, X, Plus, ChartLine, RocketLaunch, ArrowSquareUpRight, Gear, Question, SignOut } from "@phosphor-icons/react";

import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { Accordion } from "./Acorddion";

interface HeaderProps {
  title: string;
}

const links = [
  { id: "pablokaliel", name: "Profile", icon: <User size={24} /> },
  { id: "", name: "TwitterBlue", icon: <TwitterLogo size={24} /> },
  { id: "", name: "Lists", icon: <File size={24} /> },
  { id: "", name: "Bookmarks", icon: <BookmarkSimple size={24} /> },
  { id: "", name: "Communities", icon: <Users size={24} /> },
];

export function Header({ title }: HeaderProps) {
  const [showModal, setShowModal] = useState(false);
  const [focusedLinks, setFocusedLinks] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleModal = () => {
    setShowModal(!showModal);
  };
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

  const [isEscapeKeyPressed, setIsEscapeKeyPressed] = useState(false);

  useEffect(() => {
    const closeModalOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModal(false);
        setIsEscapeKeyPressed(false);
      }
    };

    if (showModal) {
      window.addEventListener("keydown", closeModalOnEscape);
    }

    return () => {
      window.removeEventListener("keydown", closeModalOnEscape);
    };
  }, [showModal]);

  useEffect(() => {
    if (isEscapeKeyPressed && showModal) {
      setShowModal(false);
      setIsEscapeKeyPressed(false);
    }
  }, [isEscapeKeyPressed, showModal]);

  return (
    <div className="py-6 sm:p-3 px-5 flex items-center justify-between text-xl w-full font-bold border-b border-b-grayBorder sticky top-0 backdrop-blur-md z-10 ">
      <div className="sm:block hidden">
        <button onClick={toggleModal}>
          <img
            className="w-10 h-10 rounded-full"
            src="https://github.com/pablokaliel.png"
            alt=""
          />
        </button>

        {showModal && (
          <div className="h-screen w-full bg-gray-800/50 inset-0 absolute backdrop-blur-sm ">
            <motion.div
              className="bg-white h-screen w-[70%] rounded-lg p-4 "
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }} 
            >
              <div className=" flex  justify-between">
                <span className="text-base">Account Info</span>
                <button onClick={toggleModal}>
                  <X />
                </button>
              </div>
              <div>
                <div className="pt-4 flex justify-between">
                  <img
                    className="w-10 h-10 rounded-full"
                    src="https://github.com/pablokaliel.png"
                    alt=""
                  />
                  <div className="w-8 h-8 rounded-full border flex items-center justify-center">
                    <Plus size={17} color="#777a7d" />
                  </div>
                </div>
                <div className="flex flex-col mt-2">
                  <span className="font-bold leading-5">Pablo Kaliel</span>
                  <span className="text-sm opacity-80">@pablokalyell</span>
                </div>
                <div className="flex mt-3 text-sm gap-5">
                  <div>
                    <span className="font-bold mr-1 opacity-80">
                      <span>9</span> Following
                    </span>
                  </div>
                  <div>
                    <span className="font-bold mr-1 opacity-80">
                      <span>5</span> follower
                    </span>
                  </div>
                </div>
                <div>
                  <nav className="flex flex-col gap-1  ">
                    {links.map((link) => (
                      <NavLink
                        key={link.id}
                        className="flex gap-5 w-full text-xl font-bold py-2 hover:bg-zinc-100 hover:dark:bg-zinc-800 md:p-2 active:text-twitterBlue"
                        to={`/${link.id}`}
                        onFocus={() => handleLinkFocus(link.id)}
                        onBlur={() => handleLinkBlur(link.id)}
                      >
                        {isLinkFocused(link.id)
                          ? React.cloneElement(link.icon, { weight: "fill" })
                          : React.cloneElement(link.icon, {
                              weight: "regular",
                            })}
                        <p className="">{link.name}</p>
                      </NavLink>
                    ))}
                  </nav>
                </div>
                <div>
                  <Accordion title="Creator Studio">
                    <Link to="/errors"
                      className="flex items-center gap-2 p-3 active:bg-zinc-100 active:dark:bg-zinc-800"
                    >
                      <ChartLine size={18} />
                      <span className="leading-5 text-base">Analytics</span>
                    </Link>
                  </Accordion>
                  <Accordion title="Professional Tools">
                    <Link to="/errors"
                      className="flex items-center gap-2 p-3 active:bg-zinc-100 active:dark:bg-zinc-800"
                    >
                      <RocketLaunch size={18} />
                      <span className="leading-5 text-base"> Twitter for Professionals </span>
                    </Link>
                    <Link to="/errors"
                      className="flex items-center gap-2 p-3 active:bg-zinc-100 active:dark:bg-zinc-800"
                    >
                      <ArrowSquareUpRight size={18} />
                      <span className="leading-5 text-base">Twitter Ads</span>
                    </Link>
                  </Accordion>
                  <Accordion title="Settings and Support">
                    <Link to="/errors"
                      className="flex items-center gap-2 p-3 active:bg-zinc-100 active:dark:bg-zinc-800"
                    >
                      <Gear size={18} />
                      <span className="leading-5 text-base">Settings</span>
                    </Link>
                    <Link to="/errors"
                      className="flex items-center gap-2 p-3 active:bg-zinc-100 active:dark:bg-zinc-800"
                    >
                      <Question size={18} />
                      <span className="leading-5 text-base">Help Center</span>
                    </Link>
                    <Link to="/errors"
                      className="flex items-center gap-2 p-3 active:bg-zinc-100 active:dark:bg-zinc-800"
                    >
                      <SignOut size={18} />
                      <span className="leading-5 text-base">Log Out</span>
                    </Link>
                  </Accordion>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
      <div>
        <p className="sm:hidden">{title}</p>
        <Link to="/"><TwitterLogo
          className="hidden sm:block"
          size={28}
          weight="fill"
          color="#1da1f2"
        /></Link>
      </div>
      <Sparkle className="w-6 h-6 text-twitterBlue" />
    </div>
  );
}
