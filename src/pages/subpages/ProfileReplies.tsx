import { useEffect, useState } from "react";
import { getTweetRetweets, getTweets, getUserRetweets } from "../../services/firebase";
import { TweetProps } from "../Timeline";
import { Tweet } from "../../components/Tweet";
import { useUser } from "../../context/UserContext";
import { initialTweets } from "../../utils/InitialTweets";
import { CircleNotch } from "@phosphor-icons/react";

function ProfileReplies() {
  const [retweetedTweets, setRetweetedTweets] = useState<TweetProps[]>([]);
  const { userInfo } = useUser();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRetweetedTweets = async () => {
      const userRetweets = await getUserRetweets(userInfo.name);
      const tweets: TweetProps[] = await getTweets();
      const retweetedTweets: TweetProps[] = [];

      for (const tweet of initialTweets) {
        const retweetsCount = await getTweetRetweets(tweet.id);
        if (userRetweets.includes(tweet.id) || retweetsCount > 0) {
          retweetedTweets.push(tweet);
        }
      }
      for (const tweet of tweets) {
        const retweetsCount = await getTweetRetweets(tweet.id);
        if (retweetsCount > 0 && tweet.userLogin !== userInfo.name) {
          retweetedTweets.push(tweet);
        }
      }
      setRetweetedTweets(retweetedTweets);
      setLoading(false);
    };
    fetchRetweetedTweets();
  }, [userInfo.name]);

  return (
    <div className="min-h-[50vh]">
      {loading ? (
        <h1 className="flex items-center gap-2 mt-5 px-5">
          {" "}
          <CircleNotch size={20} weight="bold" className="animate-spin" />
          Carregando...
        </h1>
      ) : (
        <>
          {retweetedTweets.length === 0 ? (
            <h1 className="dark:text-muteDark">
              Quando você retuitar tweets, eles aparecerão aqui.
            </h1>
          ) : (
            <div>
              {retweetedTweets.map((tweet) => (
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
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ProfileReplies;
