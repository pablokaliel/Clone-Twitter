import { useEffect, useState } from "react";
import { useTweetContext } from "../../context/TweetContext";
import { Tweet } from "../../components/Tweet";
import { getUserLikes } from "../../services/firebase";
import { TweetProps } from "../Timeline";
import { initialTweets } from "../../utils/InitialTweets";
import { useUser } from "../../context/UserContext";
import { CircleNotch } from "@phosphor-icons/react";

function ProfileLikes() {
  const { tweets } = useTweetContext();
  const [likedTweets, setLikedTweets] = useState<TweetProps[]>([]);
  const [loading, setLoading] = useState(true);
  const { userInfo } = useUser();

  useEffect(() => {
    const fetchLikedTweets = async () => {
      const userId = userInfo.name;
      const userLikes = await getUserLikes(userId);
      const allTweets = [...tweets, ...initialTweets];
      const updatedLikedTweets = allTweets.filter((tweet) =>
        userLikes.includes(tweet.id)
      );

      setLikedTweets(updatedLikedTweets);
      setLoading(false);
    };
    fetchLikedTweets();
  }, [tweets, initialTweets, userInfo.name]);

  return (
    <div className="min-h-[50vh]">
      {loading ? (
        <h1 className="flex items-center gap-2 mt-5 px-5">
          {" "}
          <CircleNotch size={20} weight="bold" className="animate-spin" />
          Carregando...
        </h1>
      ) : likedTweets.length > 0 ? (
        likedTweets.map((tweet) => (
          <Tweet
            key={tweet.id}
            userAvatar={tweet.userAvatar}
            userName={tweet.userName}
            userLogin={tweet.userLogin}
            content={tweet.content}
            imageUrl={tweet.imageUrl}
            comments={tweet.comments}
            retweets={tweet.retweets}
            likes={tweet.likes}
            id={tweet.id}
            views={tweet.views}
          />
        ))
      ) : (
        <div className="min-h-[50vh] grid place-content-center">
          <h1 className="dark:text-muteDark">
            Quando você curtir tweets, eles aparecerão aqui.
          </h1>
        </div>
      )}
    </div>
  );
}

export default ProfileLikes;
