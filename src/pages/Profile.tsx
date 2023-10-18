import { PersonalLink } from "../components/Link";
import { useAuth } from "../utils/AuthContext";
import { ArrowLeft, CalendarCheck } from "@phosphor-icons/react";
import { initialUser } from "../utils/InitialUser";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useTweetContext } from "../context/TweetContext";
import { useEffect, useState } from "react";
import { TweetProps } from "./Timeline";
import { initialTweets } from "../utils/InitialTweets";
import { useScrollDirection } from "../context/ScrollContext";

function Profile() {
  const { tweets } = useTweetContext();
  const location = useLocation().pathname;
  const scrollDirection = useScrollDirection();

  let message: string;
  let number: number;

  const userTweets = tweets.filter(
    (tweet) => tweet.userLogin === initialUser.login
  );

  const [likedTweetIds, setLikedTweetIds] = useState<string[]>([]);
  const [likedTweets, setLikedTweets] = useState<TweetProps[]>([]);

  useEffect(() => {
    const likedTweetsIds = JSON.parse(
      localStorage.getItem("likedTweets") || "[]"
    );
  
    if (!arraysAreEqual(likedTweetsIds, likedTweetIds)) {
      setLikedTweetIds(likedTweetsIds);
  
      const likedTweets = userTweets.filter((tweet) =>
        likedTweetsIds.includes(tweet.id)
      );
      setLikedTweets(likedTweets);
    }
  }, [userTweets, likedTweetIds]);
  
  function arraysAreEqual(arr1: any[], arr2: any[]): boolean {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  const allLikedTweets = likedTweets.concat(
    initialTweets.filter((tweet) => likedTweetIds.includes(tweet.id))
  );

  const tweetsWithImages = allLikedTweets.filter((tweet) => tweet.imageUrl);

  if (location === `/${initialUser.login}/media`) {
    message = tweetsWithImages.length === 1 ? "Foto e vídeo" : "Fotos e vídeos";
    number = tweetsWithImages.length;
  } else if (location === `/${initialUser.login}/likes`) {
    message = allLikedTweets.length === 1 ? "Curtida" : "Curtidas";
    number = allLikedTweets.length;
  } else {
    message = userTweets.length === 1 ? "Post" : "Posts";
    number = userTweets.length;
  }

  const { isAuthenticated } = useAuth();

  return (
    <main className="mx-auto flex-1">
      <div>
        <header
          data-isscrolldown={scrollDirection === "down"}
          className="px-5 h-[76px] dark:border-b-grayBorderDark dark:text-tweetColor dark:bg-bodyDark/60 flex items-center text-xl font-bold border-b border-b-grayBorder bg-white/75 sticky top-0 backdrop-blur-md z-10 transition-transform duration-200 justify-normal dark:bg-bodyDark/60 py-0 gap-9 sm:data-[isscrolldown=true]:-translate-y-[100%]"
        >
          <button
            onClick={() => window.history.back()}
            className="w-9 h-9 grid place-items-center rounded-full :hover-bg-black/10 "
          >
            <ArrowLeft size={20} weight="bold" />
          </button>
          {isAuthenticated ? (
            <div className="flex flex-col">
              <span>{initialUser.name}</span>
              <span className="text-xs font-normal opacity-70">
                {number} {message}
              </span>
            </div>
          ) : (
            <>Profile</>
          )}
        </header>

        {isAuthenticated ? (
          <div className="w-full">
            <div className="w-full h-52 bg-[#015b5d] flex-shrink-0" />

            <div className="grid items-start relative min-h-[48px] p-4">
              <div className="w-[135px] dark:bg-bodyDark ml-4 absolute h-[135px] rounded-full bg-white p-1 -translate-y-[52%]">
                <img
                  src={initialUser.avatarURL}
                  alt={`foto de perfil de ${initialUser.name}`}
                  className="rounded-full"
                />
              </div>
              <div className="w-full flex justify-end">
                <div className="flex items-center justify-center hover-bg-gray-300 mt-3 w-28 h-9 rounded-full font-bold dark:text-textDark border border:black/10 dark:border-white/40 transition-all duration-200">
                  <button>Editar Perfil</button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col px-4">
                <span className="text-xl font-bold leading-6 dark:text-textDark">
                  {initialUser.name}
                </span>
                <span className="text-gray-600">@{initialUser.login}</span>
              </div>

              <div className="px-4">
                <span>{initialUser.bio}</span>
              </div>

              <div className="px-4 flex gap-1 items-center">
                <CalendarCheck size={18} />
                <span className="text-base text-[#7a8791] dark:text-muteDark ">
                  Joined {initialUser.created_at}
                </span>
              </div>

              <div className="px-4 flex gap-2">
                <span className="font-bold text-sm">
                  {initialUser.followers}{" "}
                  <span className="font-normal text-sm text-[#7a8791] dark:text-muteDark">
                    following
                  </span>
                </span>

                <span className="font-bold text-sm">
                  {initialUser.following}{" "}
                  <span className="font-normal text-sm text-[#7a8791] dark:text-muteDark">
                    followers
                  </span>
                </span>

              </div>
            </div>

            <nav className="flex mt-4 h-[53px] items-center justify-around border-b border-grayBorder dark:border-grayBorderDark">
              <PersonalLink path={`/${initialUser.login}`} name="Posts" />
              <PersonalLink
                path={`/${initialUser.login}/with_replies`}
                name="Replies"
              />
              <PersonalLink
                path={`/${initialUser.login}/highlights`}
                name="Highlights"
              />
              <PersonalLink path={`/${initialUser.login}/media`} name="Media" />
              <PersonalLink path={`/${initialUser.login}/likes`} name="Likes" />
            </nav>
            <Outlet />
          </div>
        ) : (
          <Link to="/login">Logar</Link>
        )}
      </div>
    </main>
  );
}

export default Profile;
