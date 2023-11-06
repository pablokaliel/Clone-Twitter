import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useAuth } from "../utils/AuthContext";

function Explorer() {
  const { isAuthenticated } = useAuth();

  return (
    <main className="mx-auto flex-1">
      <div>
        <Header title="Explorer" />
        {isAuthenticated ? (
          <div className="flex items-center justify-center h-screen flex-col gap-5">
            <h1>
              Desculpe, esta página ainda está em desenvolvimento. Por favor,
              clique no botão abaixo para voltar à página inicial.
            </h1>
            <Link
              className="bg-twitterBlue px-5 py-3 hover:brightness-90 text-white rounded-full"
              to={"/"}
            >
              Home
            </Link>
          </div>
        ) : (
          <div className="bg-twitterBlue rounded-full mt-5 flex justify-center items-center w-fit px-4 h-10 text-white md:p-2 md:w-10 md:h-10 hover:brightness-90">
          <Link to="/login">Logar</Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default Explorer;
