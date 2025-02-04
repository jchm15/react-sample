import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Movie from "../components/Movie";
import User from "../components/UserList";
import Typing from "../components/TypingComponent";
import ChatApp from "../components/ChatApp";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/movies",
    element: <Movie />,
  },
  {
    path: "/user",
    element: <User />,
  },
  {
    path: "/typing",
    element: <Typing />,
  },
  {
    path: "/chatApp",
    element: <ChatApp />,
  },
];

export default routes;