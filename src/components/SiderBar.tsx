import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { House, MagnifyingGlass, Bell, BookmarkSimple, User, DotsThreeCircle, DotsThree, TwitterLogo, Pencil, FileText, Envelope } from "@phosphor-icons/react";
import { useAuth } from "../utils/AuthContext";
import { LinkSidebar } from "./LinkSidebar";
import { useUser } from "../context/UserContext";

function SideBar() {
  const { logout } = useAuth();
  const { userInfo } = useUser();
  const isAuthenticated = useAuth().isAuthenticated;
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [isEscapeKeyPressed, setIsEscapeKeyPressed] = useState(false);

  useEffect(() => {
    if (!userInfo.name && !userInfo.login && !userInfo.avatar) {
      alert("Bem-vindo! Parece que você não preencheu suas informações no perfil ainda. Recomendamos que você faça isso para tornar a sua experiência melhor.");
    }
  }, [userInfo]);


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

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    setShowModal(!showModal);
  };

  const handleCloseModalClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      setShowModal(!showModal);
    }
  };

  return (
    <aside className="pt-6 px-5 flex flex-col md:items-center justify-between h-screen sticky top-0 md:px-0 sm:hidden">
      <nav className="flex flex-col gap-8 md:items-center ">
        <TwitterLogo size={32} weight="fill" color="#1da1f2" />

        <div>
          <LinkSidebar path="/" icon={House} text="Home" />
          <LinkSidebar
            path="/explorer"
            icon={MagnifyingGlass}
            text="Explorer"
          />
          <LinkSidebar path="/notifications/all" icon={Bell} text="Notifications" />
          <LinkSidebar path="/messages" icon={Envelope} text="Messages" />
          <LinkSidebar
            path="/bookmarks"
            icon={BookmarkSimple}
            text="Bookmarks"
          />
          <LinkSidebar path="/lists" icon={FileText} text="Lists" />
          <LinkSidebar
            path="profile"
            icon={User}
            text="Profile"
          />
          <LinkSidebar path="/more" icon={DotsThreeCircle} text="More" />
        </div>

        <button className="bg-twitterBlue rounded-full flex justify-center items-center w-full h-14 text-white text-xl font-black md:p-2 md:w-10 md:h-10 data-[istouchsupported=false]:hover:brightness-90">
          <Pencil className="w-6 h-6 hidden md:block" />
          <span className="md:hidden">Tweet</span>
        </button>
      </nav>

      <div className="p-4 flex items-center gap-3 my-3 rounded-full transition-colors duration-200 select-none cursor-pointer md:w-16 md:h-16 md:p-3 ">
        {isAuthenticated ? (
          <>
            <img
              src={userInfo.avatar}
              alt="Foto de perfil do usuário"
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-1 justify-between items-center md:hidden">
              <div className="flex flex-col flex-shrink-0 text-sm">
                <span className="font-bold">{userInfo.name}</span>
                <span className="opacity-70 dark:opacity-50">
                  @{userInfo.login}
                </span>
              </div>

              <button
                onClick={toggleModal}
                className="hover:bg-gray-400/30 p-2 rounded-full"
              >
                <DotsThree weight="bold" size={18.75} />
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="w-10 h-10 bg-gray-300 rounded-full" />
            <div className="flex flex-1 justify-between items-center md:hidden">
              <div className="flex flex-col flex-shrink-0 text-sm">
                <span className="font-bold">usuário</span>
                <span className="opacity-70 dark:opacity-50">@user</span>
              </div>

              <button
                onClick={toggleModal}
                className="hover:bg-gray-400/30 p-2 rounded-full"
              >
                <DotsThree weight="bold" size={18.75} />
              </button>
            </div>
          </>
        )}

        {showModal && (
          <div
            className="absolute right-[3%] flex bottom-[10%] items-center justify-center z-50"
            onClick={handleCloseModalClick}
          >
            <div className="bg-gray-400/30 rounded-lg p-4">
              <div className="flex justify-end">
                <button
                  className="text-twitterBlue font-semibold mr-4 relative"
                  onClick={toggleModal}
                >
                  Cancelar
                </button>

                {isAuthenticated ? (
                  <button
                    className="text-red-500 font-semibold"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                ) : (
                  <Link to="/login" className="text-twitterBlue font-semibold">
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default SideBar;
