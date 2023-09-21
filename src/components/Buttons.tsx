import React, { useState } from "react";
import {
  ChatCircle,
  ArrowClockwise,
  Heart,
  ChartLine,
  Export,
} from "@phosphor-icons/react";

interface ButtonsProps {
  id: string;
  comments: number;
  retweets: number;
  likes: number;
}

function Buttons(props: ButtonsProps) {
  const [likes, setLikes] = useState(props.likes);
  const [isLiked, setIsLiked] = useState(false);

  function handleIncreaseLike(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    setIsLiked((prevIsLiked) => !prevIsLiked);
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
  }

  return (
    <div className="flex items-center gap-12 mt-3">
      <button
        title="comment"
        type="button"
        onClick={(event) => {
          event.preventDefault();

          console.log(`Abrir comentários para o tweet com ID: ${props.id}`);
        }}
        className="flex items-center gap-3 text-sm text-slate-400 group"
      >
        <div className="w-[34.75px] h-[34.75px] grid place-items-center rounded-full group-hover:text-twitterBlue hover:text-twitterBlue group-hover:bg-twitterBlue/10 -m-2 transition-colors duration-200 ">
          <ChatCircle size={20} />
        </div>
        <p className=" group-hover:text-twitterBlue transition-colors duration-200 ">
          {props.comments.toString()}
        </p>
      </button>

      <button
        title="retweet"
        type="button"
        onClick={(event) => {
          event.preventDefault();
          console.log(`Retuitar o tweet com ID: ${props.id}`);
        }}
        className="flex items-center gap-2 text-sm text-slate-400 group "
      >
        <div className="w-[34.75px] h-[34.75px] grid place-items-center rounded-full group-hover:text-retweetGreen hover:text-retweetGreen group-hover:bg-retweetGreen/10 -m-2 transition-colors duration-200 ">
          <ArrowClockwise size={20} />
        </div>
        <p className=" group-hover:text-retweetGreen transition-colors duration-200 ">
          {props.retweets.toString()}
        </p>
      </button>

      <button
        title="like/unlike"
        type="button"
        onClick={handleIncreaseLike}
        className="flex items-center gap-2 text-sm text-slate-400 group"
      >
        <div className="w-[34.75px] h-[34.75px] grid place-items-center rounded-full group-hover:text-likePink hover:text-likePink group-hover:bg-likePink/10 -m-2 transition-colors duration-200 ">
          {isLiked ? (
            <Heart size={18.75} weight="fill" color="#f00" />
          ) : (
            <Heart size={18.75} />
          )}
        </div>
        <p className=" group-hover:text-likePink transition-colors duration-200 ">
          {likes}
        </p>
      </button>

      <button
        title="views"
        type="button"
        onClick={(event) => {
          event.preventDefault();

          console.log(`Ação do botão ChartLine`);
        }}
        className="flex items-center gap-2 text-sm text-slate-400 group"
      >
        <div className="w-[34.75px] h-[34.75px] grid place-items-center rounded-full group-hover:text-twitterBlue hover:text-twitterBlue group-hover:bg-twitterBlue/10 -m-2 transition-colors duration-200 ">
          <ChartLine size={20} />
        </div>
        <p className=" group-hover:text-twitterBlue transition-colors duration-200 ">
          1.2k
        </p>
      </button>

      <button
        title="share"
        type="button"
        onClick={(event) => {
          event.preventDefault();

          console.log(`Ação do botão Export`);
        }}
        className="flex items-center gap-2 text-sm text-slate-400 group ml-auto"
      >
        <div className="w-[34.75px] h-[34.75px] grid place-items-center rounded-full group-hover:text-twitterBlue hover:text-twitterBlue group-hover:bg-twitterBlue/10 -m-2 transition-colors duration-200 ">
          <Export size={20} />
        </div>
      </button>
    </div>
  );
}

export default Buttons;
