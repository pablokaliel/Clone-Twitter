import Tweet from "../components/Tweet";
import SideBar from "../components/SiderBar";
import Header from "../components/Header";
import Separator from "../components/Separator";
import { initialTweets } from "../utils/InitialTweets";

function Home() {
  return (
    <div className="mx-auto max-w-[1000px] grid grid-cols-[300px_1fr]">
      <SideBar userName="Pablo Kaliel" userLogin="pablokalyell" />
      <div className="border-x border-x-grayBorder">
        <main className="">
          <Header title="Home" />
          <form className="py-6 px-5 flex flex-col gap-2">
            <label htmlFor="tweet" className="flex gap-3 ">
              <img
                className=" w-12 h-12 rounded-full"
                src="https://github.com/pablokaliel.png"
                alt=""
              />
              <textarea
                className="flex-1 text-xl font-medium mt-3 resize-none focus:outline-none placeholder:text-[#5b7083]"
                id="tweet"
                placeholder="Whtat's happening?"
              ></textarea>
            </label>

            <button
              className="ml-auto bg-twitterBlue rounded-full px-6 py-3 text-white font-black text-base hover:brightness-90"
              type="submit"
            >
              {" "}
              Tweet
            </button>
          </form>

          <Separator />

          {initialTweets.map((tweet) => {
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
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}

export default Home;
