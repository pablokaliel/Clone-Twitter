import { FormEvent, KeyboardEvent, useState } from "react";
import { Header } from "../components/Header";

import { Tweet } from "../components/Tweet";
import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import Separator from "../components/Separator";
import { useTweetContext } from "../context/TweetContext";
import { v4 as uuidv4 } from "uuid";

interface AnswerProps {
  userAvatar: string;
  userName: string;
  userLogin: string;
  content: string;
  comments: number;
  retweets: number;
  likes: number;
  id: string;
  views: number;
}

export function Status() {
  const { id } = useParams();
  const { tweets } = useTweetContext();

  const [newAnswer, setNewAnswer] = useState("");
  const [answers, setAnswers] = useState<AnswerProps[]>([
    {
      userAvatar: "https://source.unsplash.com/random/?men/94",
      userName: "Gabriel Martins",
      userLogin: "gabriell_mart",
      content: "A busca pelo conhecimento é uma jornada incrível!",
      comments: 1,
      retweets: 46,
      likes: 5,
      id: uuidv4(),
      views: 8,
    },
    {
      userAvatar: "https://source.unsplash.com/random/?woman/94",
      userName: "Sophia Rodriguez",
      userLogin: "sophiarod_099",
      content: "Que ótimo ouvir isso! 😃",
      comments: 13,
      likes: 7,
      retweets: 9,
      id: uuidv4(),
      views: 6,
    },
  ]);

  const newAnswerObj: AnswerProps = {
    userAvatar: "https://github.com/pablokaliel.png",
    userName: "Pablo Kaliel",
    userLogin: "pablokalyell",
    content: newAnswer,
    comments: 0,
    retweets: 0,
    likes: 0,
    id: uuidv4(),
    views: 0,
  };

  function createNewAnswer(e: FormEvent) {
    e.preventDefault();
    if (newAnswer.trim() === "") return;

    const newAnswerObj: AnswerProps = {
      userAvatar: "https://github.com/pablokaliel.png",
      userName: "Pablo Kaliel",
      userLogin: "pablokalyell",
      content: newAnswer,
      comments: 0,
      retweets: 0,
      likes: 0,
      id: uuidv4(),
      views: 0,
    };

    setAnswers([newAnswerObj, ...answers]);
    setNewAnswer("");
  }

  function handleHotKeySubmit(e: KeyboardEvent) {
    if (newAnswer === "") return;

    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      setAnswers([newAnswerObj, ...answers]);
      setNewAnswer("");
    }
  }

  if (!tweets) {
    return <div>Carregando...</div>;
  }
  const tweet = tweets.find((tweet) => tweet.id === id);
  if (!tweet) {
    return <NotFound />;
  }

  return (
    <main>
      <Header title="Tweet" />

      <Tweet
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

      <Separator />

      <form
        onSubmit={createNewAnswer}
        className="py-6 px-5 flex items-center gap-2 border-b-[1px] border-grayBorde dark:border-grayBorderDark sm:flex-col sm:pt-2"
      >
        <label
          htmlFor="tweet"
          className="flex items-center gap-3 flex-1 sm:w-full"
        >
          <img
            src="https://github.com/pablokaliel.png"
            alt="Maik Emanoel"
            className="w-12 h-12 rounded-full sm:w-10 sm:h-10 object-cover"
          />
          <textarea
            id="tweet"
            placeholder="Tweet your answer"
            value={newAnswer}
            onKeyDown={handleHotKeySubmit}
            className="flex-1 text-xl font-medium mt-5 resize-none focus:outline-none placeholder:text-[#5b7073] placeholder:dark:text-[#828282] sm:placeholder:text-base"
            onChange={(e) => setNewAnswer(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className="ml-auto bg-twitterBlue rounded-full py-3 px-6 text-white font-black transition-all duration-300 ease-in-out disabled:opacity-60 disabled:pointer-events-none sm:py-2 sm:px-5"
          disabled={newAnswer.trim() === "" ? true : false}
        >
          Answer
        </button>
      </form>

      <div className="sm:mb-12">
        {answers.map((answer) => (
          <Tweet
            key={answer.id}
            id={answer.id}
            userAvatar={answer.userAvatar}
            userName={answer.userName}
            userLogin={answer.userLogin}
            content={answer.content}
            comments={answer.comments}
            retweets={answer.retweets}
            likes={answer.likes}
            views={answer.views}
          />
        ))}
      </div>
    </main>
  );
}
