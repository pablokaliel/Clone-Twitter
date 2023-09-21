import { Link } from "react-router-dom";
import SideBar from "../components/SiderBar";
import Header from "../components/Header";

function Notifications() {
  return (

    <main className="mx-auto max-w-[1000px] grid grid-cols-[300px_1fr]">
    <SideBar userLogin="pablokalyell" userName="Pablo Kaliel" />
    <div>
      <Header title="Notifications" />

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

export default Notifications;
