import { useEffect, useState } from "react";
import { useTweetContext } from "../../context/TweetContext";
import { Tweet } from "../../components/Tweet";
import { getUserLikes } from "../../services/firebase"; // Importe a função getUserLikes

function ProfileLikes() {
  const { tweets } = useTweetContext();
  const [likedTweetIds, setLikedTweetIds] = useState<string[]>([]);

  useEffect(() => {
    // Obtenha os IDs dos tweets curtidos pelo usuário atual
    const fetchLikedTweets = async () => {
      const userId = "ID_DO_USUARIO_ATUAL"; // Substitua pelo ID do usuário atual
      const userLikes = await getUserLikes(userId);
      setLikedTweetIds(userLikes);
    };

    fetchLikedTweets();
  }, []);

  // Filtrar os tweets curtidos com base nos IDs
  const likedTweets = tweets.filter((tweet) => likedTweetIds.includes(tweet.id));

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
