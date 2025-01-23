import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Movie from "../components/Movie";
import User from "../components/UserList";

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
];

export default routes;