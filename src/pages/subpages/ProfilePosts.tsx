import { useEffect, useState } from "react";
import { Tweet } from "../../components/Tweet";
import { useTweetContext } from "../../context/TweetContext";
import { useUser } from "../../context/UserContext";
import { TweetProps } from "../Timeline";
import { CircleNotch } from "@phosphor-icons/react";

export function ProfilePosts() {
  const { tweets } = useTweetContext();
  const { userInfo } = useUser();
  const [loading, setLoading] = useState(true);
  const [userTweets, setUserTweets] = useState<TweetProps[]>([]);

  useEffect(() => {
    setTimeout(() => {
      const filteredTweets = tweets.filter(
        (tweet) => tweet.userLogin === userInfo.login
      );
      setUserTweets(filteredTweets);
      setLoading(false);
    }, 500);
  }, [tweets, userInfo.login]);

  return (
    <div className="min-h-[50vh]">
      {loading ? (
        <h1 className="flex items-center gap-2 mt-5 px-5">
          {" "}
          <CircleNotch size={20} weight="bold" className="animate-spin" />
          Carregando...
        </h1>
      ) : userTweets.length === 0 ? (
        <h1 className="mt-5 px-5">Nenhum post disponível.</h1>
      ) : (
        userTweets.map((tweet) => (
          <Tweet
            id={tweet.id}
            key={tweet.id}
            userAvatar={userInfo.avatar}
            userName={userInfo.name}
            userLogin={userInfo.login}
            content={tweet.content}
            comments={tweet.comments}
            retweets={tweet.retweets}
            likes={tweet.likes}
            isLiked={tweet.isLiked}
            imageUrl={tweet.imageUrl}
            views={tweet.views}
          />
        ))
      )}
    </div>
  );
}
