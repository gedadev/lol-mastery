import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Summoner from "./views/Summoner";
import ChampionCardContainer from "./components/ChampionCardContainer";
import ChampionDetails from "./components/ChampionDetails";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "summoner",
      element: <Summoner />,
      children: [
        {
          path: "",
          element: <ChampionCardContainer />,
        },
        {
          path: ":championId",
          element: <ChampionDetails />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
