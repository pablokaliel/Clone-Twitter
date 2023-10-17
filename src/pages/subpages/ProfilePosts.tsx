//ProfilePosts//
import { Tweet } from "../../components/Tweet";
import { useTweetContext } from "../../context/TweetContext";
import { initialUser } from "../../utils/InitialUser";

function ProfilePosts() {
  const { tweets } = useTweetContext();
  const userLogin = initialUser.login;

  const userTweets = tweets.filter((tweet) => tweet.userLogin === userLogin);

  return (
    <div className="min-h-[50vh]">
      {userTweets.map((tweet) => {
        return (
          <Tweet
            key={tweet.id}
            id={tweet.id}
            userAvatar={tweet.userAvatar}
            userName={tweet.userName}
            userLogin={tweet.userLogin}
            content={tweet.content}
            comments={tweet.comments}
            retweets={tweet.retweets}
            likes={tweet.likes}
            isLiked={tweet.isLiked}
            imageUrl={tweet.imageUrl}
            views={tweet.views}
          />
        );
      })}
    </div>
  );
}

export default ProfilePosts;
