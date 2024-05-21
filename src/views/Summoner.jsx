import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import championFull from "../assets/data/championFull.json";
import SummonerBanner from "./components/SummonerBanner";
import { convertTimestampToDate } from "../utils/epochConverter";

export default function Summoner() {
  const location = useLocation();
  const puuid = location.state.puuid;
  const gameName = location.state.gameName;
  const tagLine = location.state.tagLine;
  const [champList, setChampList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [champsPerPage, setChampsPerPage] = useState(30);
  const totalPage = Math.ceil(champList.length / champsPerPage);
  const sliceData = champList.slice(
    (currentPage - 1) * champsPerPage,
    currentPage * champsPerPage
  );

  useEffect(() => {
    const getChampList = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/getChampList?puuid=${puuid}`
        );
        setChampList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getChampList();
  }, [puuid]);

  const getChampData = (champId) => {
    const champData = Object.values(championFull.data).find(
      (champ) => champ.key === champId
    );

    return {
      name: champData.name,
      title: champData.title,
      image: champData.id,
    };
  };

  return (
    <section className="p-2">
      <SummonerBanner gameName={gameName} tagLine={tagLine} puuid={puuid} />
      <div className="m-auto grid grid-cols-5 gap-2 md:max-w-screen-lg">
        {sliceData.map((champ) => (
          <article key={getChampData(String(champ.championId)).name}>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${
                getChampData(String(champ.championId)).image
              }_0.jpg`}
              alt={`${getChampData(String(champ.championId)).name} image`}
            />
            <h2>{getChampData(String(champ.championId)).name}</h2>
            <p>{champ.championLevel}</p>
            <p>{champ.championPoints}</p>
            {champ.chestGranted ? <p>Chest Granted</p> : <p>No Chest</p>}
            <p>{convertTimestampToDate(champ.lastPlayTime)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
