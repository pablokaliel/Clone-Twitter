import { Link } from "react-router-dom";

function BookMarks() {
  return (
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
  );
}

export default BookMarks;
