import { Link } from "react-router-dom";
import Buttons from "./Buttons";

export interface TweetProps {
  id: string;
  userAvatar: string;
  userName: string;
  userLogin: string;
  content: string;
  imageUrl?: string | undefined;
  comments: number;
  retweets: number;
  likes: number;
  views:number
}

function Tweet(props: TweetProps) {
  return (
    <Link
      to={`/status/${props.id}`}
      className="px-5 py-6 grid grid-cols-[max-content_1fr] gap-3 border-b hover:bg-zinc-100 hover:transition-all ease-in duration-300 border-grayBorder"
    >
      <img className="w-12 h-12 rounded-full" src={props.userAvatar} alt="" />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          <strong>{props.userName}</strong>
          <span className="text-sm text-slate-400">@{props.userLogin}</span>
        </div>
        <div>
          <p className="leading-5">{props.content}</p>
          {props.imageUrl && (
            <div className="max-w-[500px] w-full mt-2 min-w-0">
              <img
                src={props.imageUrl}
                alt="Imagem aleatória"
                className="rounded-2xl aspect-square w-full object-cover"
              />
            </div>
          )}
        </div>
        <Buttons
          id={props.id}
          comments={props.comments}
          retweets={props.retweets}
          likes={props.likes}
          views={props.views}
        />
      </div>
    </Link>
  );
}

export default Tweet;
