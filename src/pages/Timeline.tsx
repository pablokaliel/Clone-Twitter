import { FormEvent, KeyboardEvent, useState } from "react";
import { Header } from "../components/Header";
import { Tweet } from "../components/Tweet";
import Separator from "../components/Separator";
import { initialTweets } from "../utils/InitialTweets";
import { v4 as uuidv4 } from "uuid";
import { saveTweets } from "../utils/TweetUtils";

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
}

export function Timeline() {
  const [newTweet, setNewTweet] = useState<TweetProps>({
    id: uuidv4(),
    userAvatar: "https://github.com/pablokaliel.png",
    userName: "PabloKaliel",
    userLogin: "pablokalyell",
    content: "",
    comments: 0,
    retweets: 0,
    likes: 0,
    imageUrl: undefined,
  });

  const [tweets, setTweets] = useState<TweetProps[]>(initialTweets);

  function createNewTweet(e: FormEvent) {
    e.preventDefault();
    if (newTweet.content.trim() === "") return;
  
    const newTweetWithId = {
      ...newTweet,
      id: uuidv4(), // Gera um ID exclusivo
    };
  
    setTweets((prevTweets) => [newTweetWithId, ...prevTweets]);
    setNewTweet({
      id: uuidv4(),
      userAvatar: "https://github.com/pablokaliel.png",
      userName: "PabloKaliel",
      userLogin: "pablokalyell",
      content: "",
      comments: 0,
      retweets: 0,
      likes: 0,
      imageUrl: undefined,
    });

    saveTweets([newTweetWithId, ...tweets]);
  }

  function handleHotKeySubmit(e: KeyboardEvent) {
    if ((e.key === "Enter" && (e.ctrlKey || e.metaKey)) && newTweet.content.trim() !== "") {
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
        likes: 0,
        imageUrl: undefined,
      });
    }
  }

  return (
    <main>
      <Header title="Home" />

      <form onSubmit={createNewTweet} className="py-6 px-5 flex flex-col gap-2">
        <label htmlFor="tweet" className="flex gap-3">
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
        />
      ))}
    </main>
  );
}
