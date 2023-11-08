import { useEffect, useState } from "react";
import { useTweetContext } from "../../context/TweetContext";
import { Tweet } from "../../components/Tweet";
import { getUserLikes } from "../../services/firebase";
import { TweetProps } from "../Timeline";
import { initialTweets } from "../../utils/InitialTweets";
import { useUser } from "../../context/UserContext";

function ProfileLikes() {
  const { tweets } = useTweetContext();
  const [likedTweets, setLikedTweets] = useState<TweetProps[]>([]);
  const {userInfo} = useUser()

  useEffect(() => {
    const fetchLikedTweets = async () => {
      const userId = userInfo.name;
      const userLikes = await getUserLikes(userId);
      const allTweets = [...tweets, ...initialTweets];
      const updatedLikedTweets = allTweets.filter((tweet) => userLikes.includes(tweet.id));

      setLikedTweets(updatedLikedTweets);
    };

    fetchLikedTweets();
  }, [tweets, initialTweets]);

  return (
    <div className="min-h-[50vh]">
      {likedTweets.length > 0 ? (
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
