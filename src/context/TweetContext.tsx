import React, { createContext, useContext, useEffect, useState } from "react";
import { TweetProps } from "../pages/Timeline";
import { getTweets } from "../services/firebase";

type TweetContextType = {
  tweets: TweetProps[];
  setTweets: React.Dispatch<React.SetStateAction<TweetProps[]>>;
};

const TweetContext = createContext<TweetContextType | undefined>(undefined);

export function TweetProvider({ children }: { children: React.ReactNode }) {
  const [tweets, setTweets] = useState<TweetProps[]>([]);

  useEffect(() => {
    const fetchTweets = async () => {
      const tweetsFromFirestore = await getTweets();
      setTweets(tweetsFromFirestore);
    };

    if (tweets.length === 0) {
      fetchTweets();
    }
  }, [tweets]);

  return (
    <TweetContext.Provider value={{ tweets, setTweets }}>
      {children}
    </TweetContext.Provider>
  );
}

export function useTweetContext() {
  const context = useContext(TweetContext);
  if (context === undefined) {
    throw new Error(
      "useTweetContext deve ser usado dentro de um TweetProvider"
    );
  }
  return context;
}
