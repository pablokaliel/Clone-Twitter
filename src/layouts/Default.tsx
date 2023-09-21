import { Outlet } from "react-router-dom";

import { TweetProvider } from "../context/TweetContext";
import { Sidebar } from "../components/SiderBar";

export function Default() {
  return (
    <div className="mx-auto max-w-[1000px] grid grid-cols-[300px_1fr] md:grid-cols-[80px_1fr] min-h-screen sm:grid-cols-1">
      <TweetProvider>
        <Sidebar />

        <div className="border-l-[1px] border-r-[1px] border-grayBorder dark:border-grayBorderDark sm:border-none">
          <Outlet />
        </div>
      </TweetProvider>
    </div>
  );
}
