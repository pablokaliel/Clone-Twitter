import { Link } from "react-router-dom";
import { TweetProps } from "../pages/Timeline";

import { DotsThree } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { Menu } from "./Menu";
import { ProfileInfo } from "./ProfileInfo";
import Buttons from "./Buttons";
import { isTouchSupported } from "../utils/TouchUtils";

export function Tweet({ userAvatar, userName, userLogin, content, imageUrl, comments, retweets, likes, id, views, createdAt }: TweetProps) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isProfileInfoVisible, setIsProfileInfoVisible] = useState(false);
  const profileInfoRef = useRef<null | HTMLDivElement>(null);

  const dataEhoraAtual = (dataehora: Date | string | undefined) => {
    if (!dataehora) {
      return "";
    }
    let postDate: Date;
    if (typeof dataehora === "string") {
      postDate = new Date(dataehora);
    } else {
      postDate = dataehora;
    }

    const nowTime = new Date();
    const timeChange = nowTime.getTime() - postDate.getTime();

    const seconds = Math.floor(timeChange / 1000);
    const minutes = Math.floor(seconds / 60);
    const hour = Math.floor(minutes / 60);
    const day = Math.floor(hour / 24);

    if (day > 0) {
      return `${day} dia${day > 1 ? "s" : ""} atrás`;
    }
    if (hour > 0) {
      return `${hour} hora${hour > 1 ? "s" : ""} atrás`;
    }
    if (minutes > 0) {
      return `${minutes} minuto${minutes > 1 ? "s" : ""} atrás`;
    }
    if (seconds >= 0) {
      return `${seconds} segundo${seconds > 1 ? "s" : ""} atrás`;
    }
    return "Sem data";
  };

  const path = window.location.pathname;

  function handleMouseEnter() {
    if (path != "/") return;
    setTimeout(() => {
      setIsProfileInfoVisible(true);
    }, 500);
  }

  let timeout: NodeJS.Timeout | number;

  function handleMouseLeave() {
    if (path != "/") return;
    if (profileInfoRef.current) {
      setIsProfileInfoVisible(true);

      profileInfoRef.current.onmouseenter = () => {
        clearTimeout(timeout);
      };

      profileInfoRef.current.onmouseleave = () => {
        setTimeout(() => {
          setIsProfileInfoVisible(false);
        }, 500);
      };
    }

    timeout = setTimeout(() => {
      setIsProfileInfoVisible(false);
    }, 1000);
  }

  return (
    <Link
      to={`/status/${id}`}
      data-istouchsupported={isTouchSupported}
      className="w-full py-6 px-5 grid grid-cols-[max-content_1fr] gap-3 border-b border-grayBorder transition-[background] duration-200 dark:border-grayBorderDark relative 
      data-[istouchsupported=false]:hover:bg-black/[0.03] 
      data-[istouchsupported=false]:hover:dark:bg-white/[0.03]"
    >
      <img
        src={userAvatar}
        alt={userName}
        className="w-10 h-10 rounded-full object-cover object-top"
        loading="lazy"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      <div className="flex flex-col flex-1 gap-[2px]">
        <div
          data-ismenuvisible={isMenuVisible}
          className="flex items-center justify-between relative
          sm:data-[ismenuvisible=true]:static"
        >
          <div >
            <div className="w-full items-center grid grid-cols-[auto,1fr] gap-x-1 pr-8 sm:gap-0 overflow-hidden">
              <strong
                className="whitespace-nowrap w-full overflow-hidden text-ellipsis leading-5 sm:mr-1"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                {userName}
              </strong>
              <span
                className="text-sm text-[#89a2b8] dark:text-[#828282] w-fit"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                @{userLogin}
              </span>
            </div>
            <span className="text-xs text-stone-600 mb-4">
              {dataEhoraAtual(createdAt)}
            </span>
          </div>

          <div
            data-istouchsupported={isTouchSupported}
            className="absolute -top-2 right-0 w-[34.75px] h-[34.75px] group rounded-full grid place-items-center 
            data-[istouchsupported=false]:hover:bg-twitterBlue/10"
            onClick={(e) => {
              e.preventDefault();
              setIsMenuVisible(true);
            }}
            title="Menu"
          >
            <DotsThree
              weight="bold"
              size={18.75}
              data-istouchsupported={isTouchSupported}
              className="text-black/50 dark:text-white/50 data-[istouchsupported=false]:group-hover:text-twitterBlue"
            />
          </div>

          {isMenuVisible && (
            <Menu
              setIsMenuVisible={setIsMenuVisible}
              isMenuVisible={isMenuVisible}
              tweetId={id}
              userLogin={userLogin}
            />
          )}
        </div>

        <div>
          <p
            className="leading-5 dark:text-tweetColor w-full whitespace-pre-line"
            style={{ overflowWrap: "anywhere" }}
          >
            {content}
          </p>
          {imageUrl && (
            <div className="w-full mt-2 min-w-0">
              <img
                src={imageUrl}
                alt="Imagem aleatória"
                className="rounded-2xl aspect-square w-full object-cover"
              />
            </div>
          )}
        </div>

        <Buttons
          id={id}
          comments={comments}
          retweets={retweets}
          likes={likes}
          views={views}
        />
      </div>

      {isProfileInfoVisible && (
        <ProfileInfo
          profileInfoRef={profileInfoRef}
          userAvatar={userAvatar}
          userName={userName}
          userLogin={userLogin}
        />
      )}
    </Link>
  );
}
