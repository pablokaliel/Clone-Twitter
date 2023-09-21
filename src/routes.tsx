import { createBrowserRouter  } from "react-router-dom";
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

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Default />,
        children: [
            {
                path: '/',
                element: <Timeline />
            },
            {
                path: '/status',
                element: <Status />
            },
            {
                path: '/bookmarks',
                element: <BookMarks />
            },
            {
                path: '/explorer',
                element: <Explorer />
            },
            {
                path: '/lists',
                element: <Lists />
            },
            {
                path: '/messages',
                element: <Messages />
            },
            {
                path: '/more',
                element: <More />
            },
            {
                path: '/notifications',
                element: <Notifications />
            },
            {
                path: '/profile',
                element: <Profile />
            },
            {
                path: '/login',
                element: <InitalLogin />
            },
            {
                path: '/status/:id',
                element: <Status />
            },
            {
                path: '*',
                element: <NotFound />
            },
        ]
    }
])