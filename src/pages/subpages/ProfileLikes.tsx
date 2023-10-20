// profileLikes.tsx
import { useEffect, useState } from "react";
import { useTweetContext } from "../../context/TweetContext";
import { Tweet } from "../../components/Tweet";
import { getUserLikes } from "../../services/firebase";
import { TweetProps } from "../Timeline";
import { initialTweets } from "../../utils/InitialTweets";

function ProfileLikes() {
  const { tweets } = useTweetContext();
  const [likedTweets, setLikedTweets] = useState<TweetProps[]>([]);

  useEffect(() => {
    // Obtenha os IDs dos tweets curtidos pelo usuário atual
    const fetchLikedTweets = async () => {
      const userId = "ID_DO_USUARIO_ATUAL"; // Substitua pelo ID do usuário atual
      const userLikes = await getUserLikes(userId);

      // Filtrar apenas os tweets iniciais que foram curtidos
      const initialTweetsLiked = initialTweets.filter((tweet) => userLikes.includes(tweet.id));

      // Combine os IDs de todos os tweets curtidos com os IDs dos tweets do usuário
      const allLikedTweetsIds = [...userLikes, ...tweets.map((tweet) => tweet.id)];

      // Filtrar os tweets do usuário e adicionar os tweets iniciais curtidos
      const userLikedTweets = [...tweets, ...initialTweetsLiked].filter((tweet) => allLikedTweetsIds.includes(tweet.id));

      setLikedTweets(userLikedTweets);
    };

    fetchLikedTweets();
  }, [tweets]);

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
