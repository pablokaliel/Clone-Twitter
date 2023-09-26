import { Link } from "react-router-dom";
import { TweetProps } from "../pages/Timeline";
import Buttons from "./Buttons";

export function Tweet({
  userAvatar,
  userName,
  userLogin,
  content,
  imageUrl,
  comments,
  retweets,
  likes,
  id,
  views,
}: TweetProps) {
  return (
    <Link
      to={`/status/${id}`}
      className="w-full py-6 px-5 grid grid-cols-[max-content_1fr] gap-3 border-b-[1px] border-grayBorder transition-colors duration-200 dark:border-grayBorderDark 
      data-[istouchsupported=false]:hover:bg-black/[0.03] 
      data-[istouchsupported=false]:hover:dark:bg-white/[0.03]"
    >
      <img
        src={userAvatar}
        alt={userName}
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="flex flex-col gap-[2px] w-full">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center gap-1">
            <strong>{userName}</strong>
            <span className="text-sm text-[#89a2b8] dark:text-[#828282]">
              @{userLogin}
            </span>
          </div>
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
    </Link>
  );
}
