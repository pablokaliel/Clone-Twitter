import { Tweet } from "../../components/Tweet";
import { useTweetContext } from "../../context/TweetContext";
import { useUser } from "../../context/UserContext";

export function ProfilePosts() {
  const { tweets } = useTweetContext();
  const { userInfo } = useUser();

  const userTweets = tweets.filter((tweet) => tweet.userLogin === userInfo.login);

  return (
    <div className="min-h-[50vh]">
      {userTweets.map((tweet) => (
        <Tweet
          key={tweet.id}
          id={tweet.id}
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
      ))}
    </div>
  );
}
