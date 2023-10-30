import { PersonalLink } from "../components/Link";
import { useAuth } from "../utils/AuthContext";
import { ArrowLeft, CalendarCheck, CameraPlus, CircleNotch, X } from "@phosphor-icons/react";
import { initialUser } from "../utils/InitialUser";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useTweetContext } from "../context/TweetContext";
import { ChangeEvent, useEffect, useState } from "react";
import { TweetProps } from "./Timeline";
import { initialTweets } from "../utils/InitialTweets";
import { useScrollDirection } from "../context/ScrollContext";
import { AnimatePresence } from "framer-motion";

import { motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import { saveUser } from "../utils/SaveUser";

function Profile() {
  const [imgFile, setImgFile] = useState<string | undefined>(initialUser.avatarURL);
  const { userInfo, setUserInfo } = useUser();
  const [editLoginValue, setEditLoginValue] = useState(userInfo.login);
  const [editNameValue, setEditNameValue] = useState(userInfo.name);
  const [editBioValue, setEditBioValue] = useState(userInfo.bio);

  const { tweets, setTweets } = useTweetContext();
  const [isLoading, setIsLoading] = useState(false);

  const drawerVariants = {
    open: {
      scale: 1,
      transition: { type: "tween", duration: 0.3 },
    },
    closed: {
      scale: 0,
      transition: { type: "tween", duration: 0.3 },
    },
  };

  function getImgFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setImgFile(imageUrl);
      };

      reader.readAsDataURL(file);
    }
  }

  function handleSaveNewInfo() {
    if (editNameValue && editLoginValue) {
      setIsLoading(true);

      setTimeout(() => {
        setShowModal(false);
        setUserInfo({
          ...userInfo,
          avatar: imgFile as string,
          name: editNameValue,
          bio: editBioValue,
          login: editLoginValue,
        });

        saveUser({
          ...userInfo,
          avatar: imgFile as string,
          name: editNameValue,
          bio: editBioValue,
          login: editLoginValue,
        });

        const updatedTweets = tweets.map((tweet) => {
          if (tweet.userLogin === userInfo.login) {
            return {
              ...tweet,
              userName: editNameValue,
              userAvatar: imgFile as string,
              userLogin: editLoginValue,
            };
          }
          return tweet;
        });

        setTweets(updatedTweets);
        setIsLoading(false);
      }, 1500);
    } else {
      alert("Os campos não podem estar vazios.Preencha os campos!");
    }
  }

  const [showModal, setShowModal] = useState(false);

  const [isEscapeKeyPressed, setIsEscapeKeyPressed] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const closeModalOnEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowModal(false);
        setIsEscapeKeyPressed(false);
      }
    };

    if (showModal) {
      window.addEventListener("keydown", closeModalOnEscape);
    }

    return () => {
      window.removeEventListener("keydown", closeModalOnEscape);
    };
  }, [showModal]);

  useEffect(() => {
    if (isEscapeKeyPressed && showModal) {
      setShowModal(false);
      setIsEscapeKeyPressed(false);
    }
  }, [isEscapeKeyPressed, showModal]);

  const location = useLocation().pathname;
  const scrollDirection = useScrollDirection();

  let message: string;
  let number: number;

  const userTweets = tweets.filter(
    (tweet) => tweet.userLogin === userInfo.login
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

  if (location === `/${userInfo.login}/media`) {
    message = tweetsWithImages.length === 1 ? "Foto e vídeo" : "Fotos e vídeos";
    number = tweetsWithImages.length;
  } else if (location === `/${userInfo.login}/likes`) {
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
          className="px-5 h-[76px] dark:border-b-grayBorderDark dark:text-tweetColor dark:bg-bodyDark/60 flex items-center text-xl font-bold border-b border-b-grayBorder bg-white/75 sticky top-0 backdrop-blur-md z-10 transition-transform duration-200 justify-normal py-0 gap-9 sm:data-[isscrolldown=true]:-translate-y-[100%]"
        >
          <button
            onClick={() => window.history.back()}
            className="w-9 h-9 grid place-items-center rounded-full :hover-bg-black/10 "
          >
            <ArrowLeft size={20} weight="bold" />
          </button>
          {isAuthenticated ? (
            <div className="flex flex-col">
              <span>{userInfo.name}</span>
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
                  src={userInfo.avatar}
                  alt={`foto de perfil de ${userInfo.name}`}
                  className="rounded-full w-full h-full"
                />
              </div>
              <div className="w-full flex justify-end">
                <div className="flex items-center justify-center hover-bg-gray-300 mt-3 w-28 h-9 rounded-full font-bold dark:text-textDark border border:black/10 dark:border-white/40 transition-all duration-200">
                  <button onClick={toggleModal}>Editar Perfil</button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col px-4">
                <span className="text-xl font-bold leading-6 dark:text-textDark">
                  {userInfo.name}
                </span>
                <span className="text-gray-600">@{userInfo.login}</span>
              </div>

              <div className="px-4">
                <span>{userInfo.bio}</span>
              </div>

              <div className="px-4 flex gap-1 items-center">
                <CalendarCheck size={18} />
                <span className="text-base text-[#7a8791] dark:text-muteDark ">
                  Joined {userInfo.created_at}
                </span>
              </div>

              <div className="px-4 flex gap-2">
                <span className="font-bold text-sm">
                  {userInfo.followers}{" "}
                  <span className="font-normal text-sm text-[#7a8791] dark:text-muteDark">
                    following
                  </span>
                </span>

                <span className="font-bold text-sm">
                  {userInfo.following}{" "}
                  <span className="font-normal text-sm text-[#7a8791] dark:text-muteDark">
                    followers
                  </span>
                </span>
              </div>
            </div>

            <nav className="flex mt-4 h-[53px] items-center justify-around border-b border-grayBorder dark:border-grayBorderDark">
              <PersonalLink path={`/${userInfo.login}`} name="Posts" />
              <PersonalLink
                path={`/${userInfo.login}/with_replies`}
                name="Replies"
              />
              <PersonalLink
                path={`/${userInfo.login}/highlights`}
                name="Highlights"
              />
              <PersonalLink path={`/${userInfo.login}/media`} name="Media" />
              <PersonalLink path={`/${userInfo.login}/likes`} name="Likes" />
            </nav>
            <Outlet />
            <AnimatePresence
              onExitComplete={() => setIsEscapeKeyPressed(false)}
            >
              {showModal && (
                <div className="fixed top-0 left-0 w-full h-screen backdrop-blur-sm z-50 flex items-center justify-center">
                  <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={drawerVariants}
                    className="w-full max-w-[600px] min-h-[400px] mx-5 py-4 px-4 bg-white dark:bg-bodyDark shadow-menu rounded-2xl flex flex-col md:max-w-none md:mx-0 md:max-h-none md:h-full md:shadow-none md:rounded-none"
                  >
                    <header className="flex items-center justify-between mb-5">
                      <div className="flex items-center">
                        <button
                          onClick={toggleModal}
                          className="w-9 h-9 rounded-full grid place-items-center mr-5 hover:bg-black/10 dark:hover:bg-white/10"
                          title="Fechar"
                        >
                          <X size={20} weight="bold" />
                        </button>

                        <h2 className="text-xl font-bold dark:text-textDark">
                          Edit profile
                        </h2>
                      </div>
                    </header>

                    <div>
                      <div className="relative w-fit mt-12 mb-5">
                        <img
                          src={imgFile}
                          alt="User profile image"
                          className="rounded-full w-28 h-28 object-cover brightness-90"
                        />
                        <label
                          htmlFor="avatarInput"
                          title="Add photo"
                          className="cursor-pointer w-10 h-10 grid place-items-center absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-full transition-all duration-200 bg-black/60 hover:bg-black/40"
                        >
                          <CameraPlus size={24} color="#fff" />
                        </label>

                        <input
                          type="file"
                          id="avatarInput"
                          className="hidden"
                          accept="image/*"
                          onChange={getImgFile}
                        />
                      </div>

                      <div>
                        <input
                          className={`w-full h-10 rounded border-gray-600 border outline-none mt-6 px-2 text-sm bg-white/30`}
                          placeholder="Nome (obrigatório)"
                          maxLength={50}
                          value={editNameValue}
                          required
                          onChange={(e) => {
                            setEditNameValue(e.target.value);
                          }}
                          type="editName"
                        />

                        <input
                          className={`w-full h-10 rounded border-gray-600 border outline-none mt-6 px-2 text-sm bg-white/30`}
                          placeholder="Login (obrigatório)"
                          maxLength={160}
                          required
                          value={editLoginValue}
                          onChange={(e) => {
                            setEditLoginValue(e.target.value);
                          }}
                          type="editBio"
                        />
                        <input
                          className={`w-full h-10 rounded border-gray-600 border outline-none mt-6 px-2 text-sm bg-white/30`}
                          placeholder="Bio (opcional)"
                          maxLength={160}
                          value={editBioValue}
                          onChange={(e) => {
                            setEditBioValue(e.target.value);
                          }}
                          type="editBio"
                        />
                      </div>

                      <button
                        className="rounded-full w-16 h-8 font-bold text-sm grid transition-all duration-200 place-items-center bg-twitterBlue text-white dark:bg-textDark dark:text-bodyDark mt-6"
                        onClick={handleSaveNewInfo}
                      >
                        {!isLoading ? (
                          "Save"
                        ) : (
                          <CircleNotch
                            size={18}
                            weight="bold"
                            className="animate-spin"
                          />
                        )}
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link to="/login">Logar</Link>
        )}
      </div>
    </main>
  );
}

export default Profile;
