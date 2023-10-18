import  { useEffect, useState } from "react";
import { useTweetContext } from "../../context/TweetContext";
import { Tweet } from "../../components/Tweet";

function ProfileMedia() {
  const { tweets } = useTweetContext();
  const [likedTweetIds, setLikedTweetIds] = useState<string[]>([]);
  
  useEffect(() => {
    const likedTweets = JSON.parse(localStorage.getItem("likedTweets") || "[]");
    setLikedTweetIds(likedTweets);
  }, []);

  const likedTweetsWithMedia = likedTweetIds
    .map((likedTweetId) => tweets.find((tweet) => tweet?.id === likedTweetId))
    .filter((tweet) => tweet && tweet.imageUrl);

  return (
    <div className="min-h-[50vh]">
      <div>
        {likedTweetsWithMedia.length > 0 ? (
          likedTweetsWithMedia.map((tweet) => (
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
              No liked tweets with images found in your profile.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileMedia;
