import { useLocation } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SummonerBanner from "./components/SummonerBanner";
import { APIContext } from "../APIContext";
import ChampionCardContainer from "./components/ChampionCardContainer";

export default function Summoner() {
  const location = useLocation();
  const puuid = location.state.puuid;
  const gameName = location.state.gameName;
  const tagLine = location.state.tagLine;
  const [champList, setChampList] = useState([]);
  const { serverURL } = useContext(APIContext);

  useEffect(() => {
    const getChampList = async () => {
      try {
        const response = await axios.get(
          `${serverURL}/getChampList?puuid=${puuid}`
        );
        setChampList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getChampList();
  }, [puuid, serverURL]);

  return (
    <section className="p-2 m-auto">
      <SummonerBanner gameName={gameName} tagLine={tagLine} puuid={puuid} />
      <ChampionCardContainer champList={champList} />
    </section>
  );
}
