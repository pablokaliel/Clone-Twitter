import React, { useState,useEffect } from "react";
import { ChatCircle, ArrowClockwise, Heart, ChartLine, Export } from "@phosphor-icons/react";

interface ButtonsProps {
  id: string;
  comments: number;
  retweets: number;
  likes: number;
  views: number;
}

function Buttons(props: ButtonsProps) {
  const [likes, setLikes] = useState(props.likes);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const savedLikeState = localStorage.getItem(`like_${props.id}`);
    if (savedLikeState !== null) {
      setIsLiked(JSON.parse(savedLikeState));
    }
  
    // Carregue a quantidade correta de "likes" do localStorage ao inicializar o componente.
    const savedLikes = localStorage.getItem(`likes_${props.id}`);
    if (savedLikes !== null) {
      setLikes(parseInt(savedLikes));
    }
  }, [props.id]);
  

  function handleIncreaseLike(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    event.preventDefault();
    const newLikeState = !isLiked;
  
    // Atualize o estado de "like".
    setIsLiked(newLikeState);
  
    // Atualize a quantidade de "likes" com base no estado de "like".
    const updatedLikes = newLikeState ? likes + 1 : likes - 1;
  
    // Adicione ou remova o tweet da lista de tweets "liked" no localStorage.
    const likedTweets = JSON.parse(localStorage.getItem('likedTweets') || '[]');
    if (newLikeState) {
      likedTweets.push(props.id);
    } else {
      const index = likedTweets.indexOf(props.id);
      if (index !== -1) {
        likedTweets.splice(index, 1);
      }
    }
    localStorage.setItem('likedTweets', JSON.stringify(likedTweets));

    // Salve o estado de "like" e a quantidade de "likes" atualizada no localStorage.
    localStorage.setItem(`like_${props.id}`, JSON.stringify(newLikeState));
    localStorage.setItem(`likes_${props.id}`, updatedLikes.toString());
  
    // Atualize o estado local com a quantidade de "likes" atualizada.
    setLikes(updatedLikes);
  }

  
  

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
