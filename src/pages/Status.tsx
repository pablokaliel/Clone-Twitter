import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Separator from "../components/Separator";
import Tweet from "../components/Tweet";
import { initialTweets } from "../utils/InitialTweets";
import { FormEvent } from "react";
import SideBar from "../components/SiderBar";
import { v4 as uuidv4 } from "uuid";

interface AnswerProps {
  id: string;
  userAvatar: string;
  userName: string;
  userLogin: string;
  imageUrl?:string;
  content: string;
  comments: number;
  retweets: number;
  likes: number;
  views:number;
}

export function Status() {
  const { id } = useParams();

  const [newAnswer, setNewAnswer] = useState("");
  const [answers, setAnswers] = useState<AnswerProps[]>([
    {
      id: "1",
      userAvatar: "https://github.com/maykbrito.png",
      userName: "Mayk Brito",
      userLogin: "maykbrito",
      content: "Estamos fazendo progresso",
      comments: 1,
      retweets: 9,
      likes: 2004,
      views:3
    },
    {
      id: "1",
      userAvatar: "https://github.com/diego3g.png",
      userName: "Diego Fernandes",
      userLogin: "diego_3g",
      content: "Realmente, faz sentido",
      comments: 13,
      retweets: 46,
      likes: 3021,
      views:4
    },
  ]);

  
  function createNewAnswer(e: FormEvent) {
    e.preventDefault();
    if (newAnswer === "") return;

    const newAnswerObj: AnswerProps = {
      id: uuidv4(), // Gere um ID único para cada nova resposta
      userAvatar: "https://github.com/pablokaliel.png",
      userName: "Pablo Kaliel",
      userLogin: "pablokalyell",
      content: newAnswer,
      comments: 0,
      retweets: 0,
      likes: 0,
      views: 0,
    };
  
    setAnswers([newAnswerObj, ...answers]);
    setNewAnswer("");
  }

 
  const allTweets = [...initialTweets, ...answers]; // Combine os tweets iniciais com outras respostas, se necessário.

  const tweet = allTweets.find((t) => t.id === id);

  if (!tweet) {
    return (
      <div>
        <p>Oops! O tweet não foi encontrado.</p>
        <Link to={"/"}>Voltar para a página inicial</Link>
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-[1000px] grid grid-cols-[300px_1fr]">
      <SideBar userLogin="pablokalyell" userName="Pablo Kaliel" />
      <div>
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
              className="w-12 h-12 rounded-full sm:w-10 sm:h-10"
            />
            <textarea
              id="tweet"
              placeholder="Tweet your answer"
              value={newAnswer}
              className="flex-1 text-xl font-medium mt-5 resize-none focus:outline-none placeholder:text-[#5b7073] placeholder:dark:text-[#828282] sm:placeholder:text-base"
              onChange={(e) => setNewAnswer(e.target.value)}
            />
          </label>

          <button
            type="submit"
            className="ml-auto bg-twitterBlue rounded-full py-3 px-6 text-white font-black transition-all duration-300 ease-in-out disabled:opacity-60 disabled:pointer-events-none sm:py-2 sm:px-5 data-[istouchsupported=false]:hover:brightness-90"
            disabled={newAnswer === "" ? true : false}
          >
            Answer
          </button>
        </form>

        <div className="sm:mb-12">
          {answers.map((answer) => {
            return (
              <Tweet
                id=""
                key={answer.content}
                userAvatar={answer.userAvatar}
                userName={answer.userName}
                userLogin={answer.userLogin}
                content={answer.content}
                comments={answer.comments}
                retweets={answer.retweets}
                likes={answer.likes}
                views={answer.views}
              />
            );
          })}
        </div>
      </div>
    </main>
  );
}
