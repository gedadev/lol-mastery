import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Summoner from "./views/Summoner";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/summoner",
      element: <Summoner />,
    },
  ]);

  return <RouterProvider router={router} />;
}
