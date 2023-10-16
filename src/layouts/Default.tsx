import { Outlet } from "react-router-dom";

import { TweetProvider } from "../context/TweetContext";
import SideBar from "../components/SiderBar";
import { BottomMobile } from "../components/BottomMobile";
import { ScrollDirectionProvider } from "../context/ScrollContext";

export function Default() {
  return (
    <div className="w-full mx-auto max-w-[1000px] grid grid-cols-[300px_1fr] md:grid-cols-[80px_1fr] min-h-screen sm:grid-cols-1">
      <TweetProvider>
        <ScrollDirectionProvider>
          <SideBar userLogin="pablokalyell" userName="Pablo Kaliel" />

          <div className="border-l-[1px] border-r-[1px] border-grayBorder w-full dark:border-grayBorderDark sm:border-none">
            <Outlet />
          </div>
          <BottomMobile />
        </ScrollDirectionProvider>
      </TweetProvider>
    </div>
  );
}
