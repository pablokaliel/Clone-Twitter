import { FormEvent, KeyboardEvent, useState, ChangeEvent, useEffect } from "react";
import { Header } from "../components/Header";
import { Tweet } from "../components/Tweet";
import Separator from "../components/Separator";
import { v4 as uuidv4 } from "uuid";
import { useAuth } from "../utils/AuthContext";
import { Link } from "react-router-dom";
import { CalendarBlank, Gif, Image, ListBullets, MapPin, Pencil, Smiley, X } from "@phosphor-icons/react";
import { addTweet, getTweetLikes, getTweets, uploadImage } from "../services/firebase";
import { initialTweets } from "../utils/InitialTweets";
import { useUser } from "../context/UserContext";
import { useScrollDirection } from "../context/ScrollContext";
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
  imagePreview?: string;
}

export function Timeline() {
  const { isAuthenticated } = useAuth();
  const { userInfo } = useUser();

  const scrollDirection = useScrollDirection();

  const [newTweet, setNewTweet] = useState<TweetProps>({
    id: uuidv4(),
    userAvatar: userInfo.avatar,
    userName: userInfo.name,
    userLogin: userInfo.login,
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
        alert(
          "Oopss, não podemos postar o seu tweet. Isso é feito para evitar o excesso de mensagens repetidas e garantir uma experiência melhor para todos, revise seu tweet. Agradecemos a sua compreensão!"
        );
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
          userAvatar: userInfo.avatar,
          userName: userInfo.name,
          userLogin: userInfo.login,
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
          userAvatar: userInfo.avatar,
          userName: userInfo.name,
          userLogin: userInfo.login,
          content: "",
          comments: 0,
          retweets: 0,
          likes: 0,
          views: 0,
          imageUrl: null,
          imageTitle: undefined,
        });
        window.location.reload();
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
                src={userInfo.avatar}
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
                </div>
              </>
            )}

            {newTweet.imageUrl && (
              <p className="text-sm leading-relaxed text-[#828282]">
                {newTweet.imageTitle}
              </p>
            )}
            <div className="flex gap-2 items-center">
              <label
                htmlFor="img"
                className="cursor-pointer hover:text-twitterBlue hover:bg-black/[0.08] dark:hover:bg-white/[0.1] p-2 rounded-full"
              >
                <Image size={20} />
                <input
                  className="hidden"
                  type="file"
                  accept="image/*"
                  id="img"
                  onChange={(e) => handleImageUpload(e)}
                />
              </label>
              <div className="p-2 rounded-full cursor-pointer dark:hover:bg-white/[0.1] hover:bg-black/[0.1] hover:text-twitterBlue transition-all duration-150 ">
                <Gif size={20} />
              </div>
              <div className="p-2 rounded-full cursor-pointer dark:hover:bg-white/[0.1] hover:bg-black/[0.1] hover:text-twitterBlue transition-all duration-150 ">
                <ListBullets size={20} />
              </div>
              <div className="p-2 rounded-full cursor-pointer dark:hover:bg-white/[0.1] hover:bg-black/[0.1] hover:text-twitterBlue transition-all duration-150 ">
                <Smiley size={20} />
              </div>
              <div className="p-2 rounded-full cursor-pointer dark:hover:bg-white/[0.1] hover:bg-black/[0.1] hover:text-twitterBlue transition-all duration-150 ">
                <CalendarBlank size={20} />
              </div>
              <div className="p-2 rounded-full opacity-40">
                <MapPin size={20} />
              </div>
            </div>

            <button
              type="submit"
              className="ml-auto bg-twitterBlue rounded-full py-2 px-6 text-white font-black hover:brightness-90 disabled:opacity-60 disabled:pointer-events-none"
              disabled={newTweet.content.trim() === ""}
            >
              post
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

          <Link data-isscrolldown={scrollDirection === "down"} to="createtweet" className="fixed right-4 bottom-20 sm:flex items-center justify-center bg-twitterBlue w-14 h-14 rounded-full shadow-floatButton hidden transition-opacity duration-200 data-[isscrolldown=true]:opacity-30">
            <Pencil size={24} color="white" className="mx-auto" />
          </Link>
        </>
      ) : (
        <div className="w-full h-screen">
          <p>
            Para navegar e ver os novos tweets, faça login e fique por dentro!
          </p>
          <div className="bg-twitterBlue rounded-full mt-5 flex justify-center items-center w-fit px-4 h-10 text-white md:p-2 md:w-10 md:h-10 hover:brightness-90">
          <Link to="/login">Logar</Link>
          </div>
        </div>
      )}
    </main>
  );
}
