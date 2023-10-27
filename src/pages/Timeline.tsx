import { FormEvent, KeyboardEvent, useState, ChangeEvent, useEffect } from "react";
import { Header } from "../components/Header";
import { Tweet } from "../components/Tweet";
import Separator from "../components/Separator";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";
import { Image, X } from "@phosphor-icons/react";
import { addTweet, getTweetLikes, getTweets, uploadImage } from "../services/firebase";
import { initialTweets } from "../utils/InitialTweets";

export interface TweetProps {
  id: string;
  userAvatar: string;
  userName: string;
  userLogin: string;
  content: string;
  imageUrl?: string | null;
  comments: number;
  retweets: number;
  likes: number;
  views: number;
  isLiked?: number;
  imageTitle?: string;
  imagePreview?: string,
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
    likes: 0,
    views: 0,
    imageUrl: undefined,
    imageTitle: undefined,
    imagePreview: undefined,
  });

  const [tweets, setTweets] = useState<TweetProps[]>([]);

  async function fetchTweets() {
    const tweetsFromFirestore = await getTweets();

    const mergedTweets = [...tweetsFromFirestore, ...initialTweets];

    const tweetsWithLikes = await Promise.all(
      mergedTweets.map(async (tweet) => {
        const tweetLikes = await getTweetLikes(tweet.id);
        return { ...tweet, likes: tweetLikes };
      })
    );

    setTweets(tweetsWithLikes);
  }

  useEffect(() => {
    if (tweets.length === 0) {
      fetchTweets();
    }
  }, [tweets]);

  async function createNewTweet(e: FormEvent) {
    e.preventDefault();

    if (newTweet.content.trim() === "") {
      return;
    }

    try {
      const isDuplicate = tweets.some(
        (tweet) => tweet.content === newTweet.content
      );

      if (isDuplicate) {
        console.log("Este tweet já existe localmente.");
      } else {
        let imageUrl: string | null = null;

        if (newTweet.imageUrl) {
          if (typeof newTweet.imageUrl === "string") {
            imageUrl = newTweet.imageUrl;
          } else {
            imageUrl = await uploadImage(newTweet.imageUrl);
          }
        }

        const tweetToSave = {
          id: newTweet.id,
          userAvatar: newTweet.userAvatar,
          userName: newTweet.userName,
          userLogin: newTweet.userLogin,
          content: newTweet.content,
          imageUrl: imageUrl,
          comments: 0,
          retweets: 0,
          likes: 0,
          views: 0,
        };

        await addTweet(tweetToSave);

        setTweets((prevTweets) => [tweetToSave, ...prevTweets]);

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
          imageUrl: null,
          imageTitle: undefined,
        });

        console.log("Tweet adicionado com sucesso.");
      }
    } catch (error) {
      console.error("Erro ao adicionar tweet: ", error);
    }
  }

  function handleImageUpload(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const input = e ? e.target : null;

    if (input && input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        const imageUrl = e.target ? (e.target.result as string) : null;
        if (imageUrl) {
          setNewTweet((prevTweet) => ({
            ...prevTweet,
            imageUrl: imageUrl,
            imageTitle: file.name,
            imagePreview: imageUrl,
          }));
        }
      };

      reader.readAsDataURL(file);
    }
  }

  function handleHotKeySubmit(e: KeyboardEvent) {
    if (
      e.key === "Enter" &&
      (e.ctrlKey || e.metaKey) &&
      newTweet.content.trim() !== ""
    ) {
      e.preventDefault();
      createNewTweet(e);
    }
  }

  return (
    <main className="w-full">
      <Header title="Home" />
      {isAuthenticated ? (
        <>
          <form
            onSubmit={createNewTweet}
            className="py-6 px-5 flex flex-col gap-2"
          >
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
            {newTweet.imageUrl && (
             <>
                <div className="w-full rounded-2xl overflow-hidden max-h-[400px] relative sm:ml-0">
                <img
                  src={newTweet.imagePreview}
                  alt="Imagem pré-visualizada"
                  className="aspect-video object-contain mb-2"
                />

          <div
             onClick={() =>
              setNewTweet((prevTweet) => ({
                ...prevTweet,
                imageUrl: undefined,
                imageTitle: undefined,
                imagePreview: undefined,
              }))
            }
            className="absolute top-1 right-1 w-[30.4px] h-[30.4px] text-white grid place-items-center backdrop-blur-sm bg-[#0f1419bf] rounded-full cursor-pointer transition-all duration-200 data-[istouchsupported=false]:hover:brightness-150"
          >
            <X size={18} />
          </div>
        </div></>
            )}
             {newTweet.imageUrl && (
              <p className="text-sm leading-relaxed text-[#828282]">
                {newTweet.imageTitle}
              </p>
            )}
            <label
              htmlFor="img"
              className="cursor-pointer hover:bg-black/[0.08] dark:hover:bg-white/[0.08] w-fit p-2 rounded-full"
            >
              <Image size={24} />
              <input
                className="hidden"
                type="file"
                accept="image/*"
                id="img"
                onChange={(e) => handleImageUpload(e)}
              />
            </label>

            <button
              type="submit"
              className="ml-auto bg-twitterBlue rounded-full py-3 px-6 text-white font-black hover:brightness-90 disabled:opacity-60 disabled:pointer-events-none"
              disabled={newTweet.content.trim() === ""}
            >
              Tweet
            </button>
          </form>

          <Separator />

          {tweets.map((tweet) => (
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
          ))}
        </>
      ) : (
        <div>
          <p>
            Para navegar e ver os novos tweets, faça login e fique por dentro!
          </p>
          <Link to="/login">Logar</Link>
        </div>
      )}
    </main>
  );
}
