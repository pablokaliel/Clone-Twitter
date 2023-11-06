import React, { useState, useEffect } from "react";
import { ChatCircle, ArrowClockwise, Heart, ChartLine, Export } from "@phosphor-icons/react";
import { addLike, getTweetLikes, getUserLikes, removeLike } from "../services/firebase";
import { useUser } from "../context/UserContext";

interface ButtonsProps {
  id: string;
  comments: number;
  retweets: number;
  likes: number;
  views: number;
}

function Buttons(props: ButtonsProps) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const {userInfo} =useUser()

  useEffect(() => {
    const loadData = async () => {
      const userLikes = await getUserLikes(userInfo.name);
      setIsLiked(userLikes.includes(props.id));

      const tweetLikes = await getTweetLikes(props.id);
      setLikes(tweetLikes);
    };
    loadData();
  }, [props.id]);

  const handleIncreaseLike = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    if (isLiked) {
      setIsLiked(false);
      setLikes((prevLikes) => prevLikes - 1);
      await removeLike(props.id, userInfo.name);
    } else {
      setIsLiked(true);
      setLikes((prevLikes) => prevLikes + 1);
      await addLike(props.id, userInfo.name);
    }
  };

  return (
    <div className="flex items-center gap-12 sm:gap-0 sm:justify-between mt-3">
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
        <p className="group-hover:text-twitterBlue transition-colors duration-200 ">
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
        <p className="group-hover:text-retweetGreen transition-colors duration-200 ">
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
        <p className="group-hover:text-likePink transition-colors duration-200 ">
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
          {props.views}
        </p>
      </button>

      <button
        title="share"
        type="button"
        onClick={(event) => {
          event.preventDefault();
          console.log(`Ação do botão Export`);
        }}
        className="flex items-center gap-2 text-sm text-slate-400 group ml-auto sm:hidden"
      >
        <div className="w-[34.75px] h-[34.75px] grid place-items-center rounded-full group-hover:text-twitterBlue hover:text-twitterBlue group-hover:bg-twitterBlue/10 -m-2 transition-colors duration-200 ">
          <Export size={20} />
        </div>
      </button>
    </div>
  );
}

export default Buttons;
