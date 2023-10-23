import { useTweetContext } from "../../context/TweetContext";
import { Tweet } from "../../components/Tweet";
import { initialUser } from "../../utils/InitialUser";

function ProfileMedia() {
  const { tweets } = useTweetContext();
  const userLogin = initialUser.login;

  const userTweetsWithMedia = tweets.filter(
    (tweet) => tweet.userLogin === userLogin && tweet.imageUrl
  );

  return (
    <div className="min-h-[50vh]">
      <div>
        {userTweetsWithMedia.length > 0 ? (
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
              No tweets with images found in your profile.
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileMedia;
