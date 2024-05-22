import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import championFull from "../assets/data/championFull.json";
import SummonerBanner from "./components/SummonerBanner";
import { convertTimestampToDate } from "../utils/epochConverter";
import { importedMasteries } from "../utils/importMasteries";
import chest from "../assets/img/chest.webp";

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

  const getSrc = (level) => {
    if (level > 10) level = 10;
    return importedMasteries[level - 1];
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
            <h2 className="text-center">
              {getChampData(String(champ.championId)).name}
            </h2>
            <img
              src={getSrc(champ.championLevel)}
              alt="mastery banner"
              className=""
            />
            <img
              src={chest}
              alt="chest image"
              className={`${!champ.chestGranted && "opacity-50"}`}
            />
            {/* <p>{champ.championPoints}</p> */}
            {/* <p>{convertTimestampToDate(champ.lastPlayTime)}</p> */}
          </article>
        ))}
      </div>
    </section>
  );
}
