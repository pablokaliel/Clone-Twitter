import Explorer from "./pages/Explorer";
import Home from "./pages/Home";
import { Route, Routes } from 'react-router-dom';
import Messages from "./pages/Messages";
import BookMarks from "./pages/BookMarks";
import Lists from "./pages/Lists";
import Profile from "./pages/Profile";
import More from "./pages/More";
import Notifications from "./pages/Notifications";
import { Status } from "./pages/Status";

function App() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explorer />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/bookmarks" element={<BookMarks />} />
        <Route path="/lists" element={<Lists />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/more" element={<More />} />
        <Route path="/status/:id" element={<Status />} />
      </Routes>
    </div>
  );
}

export default App;
