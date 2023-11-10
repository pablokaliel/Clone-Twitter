import { Link } from "react-router-dom";
import { TweetProps } from "../pages/Timeline";
import Buttons from "./Buttons";
import { DotsThree } from "@phosphor-icons/react";
import { Menu } from "./Menu";
import { useState } from "react";

export function Tweet({ userAvatar, userName, userLogin, content, imageUrl, comments, retweets, likes, id, views }: TweetProps) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  return (
    <Link
      to={`/status/${id}`}
      className="w-full py-6 px-5 grid grid-cols-[max-content_1fr] hover:bg-black/[0.03] hover:dark:bg-white/[0.05] gap-3 border-b-[1px] border-grayBorder transition-colors duration-200 dark:border-grayBorderDark "
    >
      <img
        src={userAvatar}
        alt={userName}
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex flex-col gap-[2px] w-full">
        <div className="flex items-center justify-between relative">
          <div className="flex justify-between w-full items-center gap-1">
            <div className="flex items-center gap-1">
              <strong>{userName}</strong>
              <span className="text-sm text-[#89a2b8] dark:text-[#828282]">
                @{userLogin}
              </span>
            </div>

            <button   onClick={(e) => {
              e.preventDefault();
              setIsMenuVisible(true);
            }}
            className="hover:bg-gray-400/30 flex items-center justify-center rounded-full w-6 h-6">
              <DotsThree size={18} />
            </button>
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


        <div className="w-full">
          <p
            className="leading-5 dark:text-tweetColor w-full whitespace-pre-line"
            style={{ overflowWrap: "anywhere" }}
          >
            {content}
          </p>
          {imageUrl && (
            <div className=" w-full mt-2">
              <img
                loading="lazy"
                src={imageUrl}
                alt=" imagem de um tweet"
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
    </Link>
  );
}
