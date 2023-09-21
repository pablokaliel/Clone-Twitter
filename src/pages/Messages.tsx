import { Link } from "react-router-dom";
import {Header }from "../components/Header";
import { Sidebar } from "../components/SiderBar";

function Messages() {
  return (

    <main className="mx-auto flex-1">
    <div>
      <Header title="Messages" />

    <div className="flex items-center justify-center h-screen flex-col gap-5">
      <h1>
        Desculpe, esta página ainda está em desenvolvimento. Por favor, clique
        no botão abaixo para voltar à página inicial.
      </h1>
      <Link
        className="bg-twitterBlue px-5 py-3 hover:brightness-90 text-white rounded-full"
        to={"/"}
      >
        Home
      </Link>

    </div>

    </div>
  </main>
  );
}

export default Messages;
