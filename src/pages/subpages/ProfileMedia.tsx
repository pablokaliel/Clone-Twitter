import { useEffect, useState } from "react";
import { useTweetContext } from "../../context/TweetContext";
import { Tweet } from "../../components/Tweet";
import { useUser } from "../../context/UserContext";
import { TweetProps } from "../Timeline";
import { CircleNotch } from "@phosphor-icons/react";

function ProfileMedia() {
  const { tweets } = useTweetContext();
  const { userInfo } = useUser();
  const [loading, setLoading] = useState(true);
  const [userTweetsWithMedia, setUserTweetsWithMedia] = useState<TweetProps[]>( [] );

  useEffect(() => {
    setTimeout(() => {
      const filteredTweets = tweets.filter(
        (tweet) => tweet.userLogin === userInfo.login && tweet.imageUrl
      );
      setUserTweetsWithMedia(filteredTweets);
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
      ) : userTweetsWithMedia.length > 0 ? (
        userTweetsWithMedia.map((tweet) => (
          <Tweet
            key={tweet?.id}
            userAvatar={tweet?.userAvatar || ""}
            userName={tweet?.userName || ""}
            userLogin={tweet?.userLogin || ""}
            content={tweet?.content || ""}
            imageUrl={tweet?.imageUrl || ""}
            comments={tweet?.comments || 0}
            retweets={tweet?.retweets || 0}
            likes={tweet?.likes || 0}
            id={tweet?.id || ""}
            views={tweet?.views || 0}
          />
        ))
      ) : (
        <div className="min-h-[50vh] grid place-content-center">
          <h1 className="dark:text-muteDark">
            Nenhum tweet com imagens encontrado em seu perfil, eles aparecerão
            aqui.
          </h1>
        </div>
      )}
    </div>
  );
}

export default ProfileMedia;
