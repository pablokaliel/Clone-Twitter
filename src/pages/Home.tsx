import { useState, FormEvent } from "react";
import Tweet from "../components/Tweet";
import SideBar from "../components/SiderBar";
import Header from "../components/Header";
import Separator from "../components/Separator";
import { initialTweets } from "../utils/InitialTweets";
import { v4 as uuidv4 } from "uuid";


export interface newTweetProps {
  id: string;
  userAvatar: string;
  userName: string;
  userLogin: string;
  content: string;
  imageUrl?: string | undefined;
  comments: number;
  retweets: number;
  likes: number;
  views: number; // Adicione esta linha
}
function Home() {
  const [newTweet,setNewTweet] = useState('')
  const [tweets,setTweets] = useState(initialTweets)



  function handleCreateNewTweet(e: FormEvent) {
    e.preventDefault();
    if (newTweet === '') return;
  
    // Crie um novo tweet com os dados fornecidos
    const newTweetData: newTweetProps = {
      id: uuidv4(), // Gere um ID único para cada novo tweet
      userAvatar: "https://github.com/pablokaliel.png",
      userName: "Pablo Kaliel",
      userLogin: "pablokalyell",
      content: newTweet,
      comments: 0,
      retweets: 0,
      likes: 0,
      views:0,
    };
  
    // Adicione o novo tweet ao array de tweets existente
    setTweets([newTweetData, ...tweets]);
  
    // Limpe o campo de texto após a criação do tweet
    setNewTweet('');
  }

  return (
    <div className="mx-auto max-w-[1000px] grid grid-cols-[300px_1fr]">
      <SideBar userName="Pablo Kaliel" userLogin="pablokalyell" />
      <div className="border-x border-x-grayBorder">
        <main>
          <Header title="Home" />

          <form
            onSubmit={handleCreateNewTweet}
            className="py-6 px-5 flex flex-col gap-2"
          >
            <label htmlFor="tweet" className="flex gap-3">
              <img
                className="w-12 h-12 rounded-full"
                src="https://github.com/pablokaliel.png"
                alt=""
              />
              <textarea
                className="flex-1 text-xl font-medium mt-3 resize-none focus:outline-none placeholder:text-[#5b7083]"
                id="tweet"
                placeholder="What's happening?"
                value={newTweet}
                onChange={(e) => {
                  setNewTweet(e.target.value);
                }}
              ></textarea>
            </label>

            <button
              className="ml-auto bg-twitterBlue rounded-full px-6 py-3 text-white font-black text-base hover:brightness-90"
              type="submit"
            >
              Tweet
            </button>
          </form>

          <Separator />

          {tweets.map((tweet) => {
            return (
              <Tweet
                key={tweet.id}
                id={tweet.id}
                userAvatar={tweet.userAvatar}
                userName={tweet.userName}
                userLogin={tweet.userLogin}
                content={tweet.content}
                imageUrl={tweet.imageUrl}
                comments={tweet.comments}
                retweets={tweet.retweets}
                likes={tweet.likes}
                views={tweet.views}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default Home;
