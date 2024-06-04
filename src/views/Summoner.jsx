import SummonerBanner from "./components/SummonerBanner";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { SummonerContext } from "../context/SummonerContext";

export default function Summoner() {
  const { summonerData } = useContext(SummonerContext);

  return (
    <section>
      <SummonerBanner
        gameName={summonerData.gameName}
        tagLine={summonerData.tagLine}
        puuid={summonerData.puuid}
        className="p-2 m-auto"
      />
      <Outlet />
    </section>
  );
}
