import { Link, Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { useAuth } from "../utils/AuthContext";
import { PersonalLink } from "../components/Link";

export default function Notifications() {
  const { isAuthenticated } = useAuth();

  return (
    <main className="mx-auto flex-1">
      <div>
        <Header title="Notifications" />
        {isAuthenticated ? (
          <>
            <div className="flex h-[53px] items-center justify-around">
              <PersonalLink path="/notifications/all" name="All" />
              <PersonalLink path="/notifications/verified" name="Verified" />
              <PersonalLink path="/notifications/mentions" name="Mentions" />
            </div>
            <Outlet />
          </>
        ) : (
          <div className="bg-twitterBlue rounded-full mt-5 flex justify-center items-center w-fit px-4 h-10 text-white md:p-2 md:w-10 md:h-10 hover:brightness-90">
          <Link to="/login">Logar</Link>
          </div>
        )}
      </div>
    </main>
  );
}
