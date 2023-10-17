import { Link, Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { useAuth } from "../utils/AuthContext";
import { PersonalLink } from "../components/Link";

export default function Notifications() {
  const { isAuthenticated } = useAuth();

  return (
    <main className="mx-auto flex-1">
      <div>
        {isAuthenticated ? (
          <>
            <Header title="Notifications" />
            <div className="flex h-[53px] items-center justify-around">
              <PersonalLink path="/notifications/all" name="All" />
              <PersonalLink path="/notifications/verified" name="Verified" />
              <PersonalLink path="/notifications/mentions" name="Mentions" />
            </div>
            <Outlet />
          </>
        ) : (
          <Link to="/Login">Logar</Link>
        )}
      </div>
    </main>
  );
}
