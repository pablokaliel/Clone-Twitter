import { createBrowserRouter } from "react-router-dom";
import { Timeline } from "./pages/Timeline";
import { Status } from "./pages/Status";
import { Default } from "./layouts/Default";
import BookMarks from "./pages/BookMarks";
import Explorer from "./pages/Explorer";
import Lists from "./pages/Lists";
import Messages from "./pages/Messages";
import More from "./pages/More";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import InitalLogin from "./pages/InitialLogin";
import { initialUser } from "./utils/InitialUser";
import Verified from "./pages/subpages/Verified";
import ProfilePosts from "./pages/subpages/ProfilePosts";
import ProfileReplies from "./pages/subpages/ProfileReplies";
import ProfileHighlights from "./pages/subpages/ProfileHighlights";
import ProfileMedia from "./pages/subpages/ProfileMedia";
import ProfileLikes from "./pages/subpages/ProfileLikes";
import Mentions from "./pages/subpages/Mentions";
import AllNotifications from "./pages/AllNotifications";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Default />,
    children: [
      {
        path: "/",
        element: <Timeline />,
      },
      {
        path: "/bookmarks",
        element: <BookMarks />,
      },
      {
        path: "/explorer",
        element: <Explorer />,
      },
      {
        path: "/lists",
        element: <Lists />,
      },
      {
        path: "/more",
        element: <More />,
      },
      {
        path: "/status/:id",
        element: <Status />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
        children: [
          {
            path: "",
          },
          {
            path: "verified",
            element: <Verified />,
          },
          {
            path: "all",
            element: <AllNotifications />,
          },
          {
            path: "mentions",
            element: <Mentions />,
          },
        ],
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: `/${initialUser.login}`,
        element: <Profile />,
        children: [
          {
            path: `/${initialUser.login}`,
            element: <ProfilePosts />,
          },
          {
            path: `/${initialUser.login}/with_replies`,
            element: <ProfileReplies />,
          },
          {
            path: `/${initialUser.login}/highlights`,
            element: <ProfileHighlights />,
          },
          {
            path: `/${initialUser.login}/media`,
            element: <ProfileMedia />,
          },
          {
            path: `/${initialUser.login}/likes`,
            element: <ProfileLikes />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <InitalLogin />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
