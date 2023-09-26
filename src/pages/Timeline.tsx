import { FormEvent, KeyboardEvent, useState } from "react";
import { Header } from "../components/Header";
import { Tweet } from "../components/Tweet";
import Separator from "../components/Separator";
import { v4 as uuidv4 } from "uuid";
import { saveTweets } from "../utils/TweetUtils";
import { useTweetContext } from "../context/TweetContext";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";

export interface TweetProps {
  id: string;
  userAvatar: string;
  userName: string;
  userLogin: string;
  content: string;
  imageUrl?: string | undefined;
  comments: number;
  retweets: number;
  likes: number;
  views: number;
}

export function Timeline() {
  const { isAuthenticated } = useAuth();
  const [newTweet, setNewTweet] = useState<TweetProps>({
    id: uuidv4(),
    userAvatar: "https://github.com/pablokaliel.png",
    userName: "PabloKaliel",
    userLogin: "pablokalyell",
    content: "",
    comments: 0,
    retweets: 0,
    likes: 1,
    views: 2,
    imageUrl: undefined,
  });

  const { tweets, setTweets } = useTweetContext();

  function createNewTweet(e: FormEvent) {
    e.preventDefault();
    if (newTweet.content.trim() === "") return;

    setTweets((prevTweets) => [newTweet, ...prevTweets]);

    setNewTweet({
      id: uuidv4(),
      userAvatar: "https://github.com/pablokaliel.png",
      userName: "PabloKaliel",
      userLogin: "pablokalyell",
      content: "",
      comments: 0,
      retweets: 0,
      likes: 0,
      views: 0,
      imageUrl: undefined,
    });

    saveTweets([...tweets, newTweet]);
  }
  function handleHotKeySubmit(e: KeyboardEvent) {
    if (
      e.key === "Enter" &&
      (e.ctrlKey || e.metaKey) &&
      newTweet.content.trim() !== ""
    ) {
      e.preventDefault();
      setTweets((prevTweets) => [newTweet, ...prevTweets]);
      setNewTweet({
        id: uuidv4(),
        userAvatar: "https://github.com/pablokaliel.png",
        userName: "PabloKaliel",
        userLogin: "pablokalyell",
        content: "",
        comments: 0,
        retweets: 0,
        likes: 1,
        views: 2,
        imageUrl: undefined,
      });
    }
  }

  return (
    <main className="w-full">
      {isAuthenticated ? (
        <>
          <Header title="Home" />

          <form
            onSubmit={createNewTweet}
            className="py-6 px-5 flex flex-col gap-2"
          >
            <label htmlFor="tweet" className="flex gap-3 max-">
              <img
                src="https://github.com/pablokaliel.png"
                alt="user"
                className="w-12 h-12 rounded-full"
              />
              <textarea
                id="tweet"
                placeholder="What's happening?"
                className="flex-1 text-xl font-medium mt-3 resize-none focus:outline-none placeholder:text-[#5b7073]"
                value={newTweet.content}
                onKeyDown={handleHotKeySubmit}
                onChange={(e) =>
                  setNewTweet({
                    ...newTweet,
                    content: e.target.value,
                  })
                }
              />
            </label>

            <button
              type="submit"
              className="ml-auto bg-twitterBlue rounded-full py-3 px-6 text-white font-black hover:brightness-90  disabled:opacity-60 disabled:pointer-events-none"
              disabled={newTweet.content.trim() === ""}
            >
              Tweet
            </button>
          </form>

          <Separator />

          {tweets.map((tweet) => (
            <Tweet
              key={tweet.id}
              content={tweet.content}
              id={tweet.id}
              comments={tweet.comments}
              retweets={tweet.retweets}
              userAvatar={tweet.userAvatar}
              userLogin={tweet.userLogin}
              likes={tweet.likes}
              userName={tweet.userName}
              imageUrl={tweet.imageUrl}
              views={tweet.views}
            />
          ))}
        </>
      ) : (
        <div>
          <p>Para navegar e ver os novos tweets, logue e fique por dentro!</p>
          <Link to="/login">Logar</Link>
        </div>
      )}
    </main>
  );
}
