import { useEffect, useState } from "react";
import { useTweetContext } from "../../context/TweetContext";
import { Tweet } from "../../components/Tweet";

function ProfileLikes() {
  const { tweets } = useTweetContext();
  const [likedTweetIds, setLikedTweetIds] = useState<string[]>([]);

  useEffect(() => {
    const likedTweets = JSON.parse(localStorage.getItem("likedTweets") || "[]");
    setLikedTweetIds(likedTweets);
  }, []);

  const likedTweets = likedTweetIds.map((likedTweetId) =>
    tweets.find((tweet) => tweet?.id === likedTweetId)
  );

  return (
    <div className=" min-h-[50vh]">
      {likedTweets.length > 0 ? (
        likedTweets.map((tweet) =>
          tweet ? (
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
          ) : null
        )
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
