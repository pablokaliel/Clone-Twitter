import { useEffect, useState } from "react";
import { getTweetRetweets, getTweets, getUserRetweets } from "../../services/firebase";
import { TweetProps } from "../Timeline";
import { Tweet } from "../../components/Tweet";
import { useUser } from "../../context/UserContext";

function ProfileReplies() {
  const [retweetedTweets, setRetweetedTweets] = useState<TweetProps[]>([]);
  const { userInfo } = useUser();

  useEffect(() => {
    const fetchRetweetedTweets = async () => {
      const userRetweets = await getUserRetweets(userInfo.name);
      const tweets: TweetProps[] = await getTweets();
      const retweetedTweets: TweetProps[] = [];

      for (const tweet of tweets) {
        const retweetsCount = await getTweetRetweets(tweet.id);
        if (userRetweets.includes(tweet.id) || retweetsCount > 0) {
          retweetedTweets.push(tweet);
        }
      }
      setRetweetedTweets(retweetedTweets);
    };
    fetchRetweetedTweets();
  }, [userInfo.name]);

  return (
    <div className="min-h-[50vh]">
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
    </div>
  );
}

export default ProfileReplies;
