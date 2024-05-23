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
    <section className="p-2 m-auto">
      <SummonerBanner gameName={gameName} tagLine={tagLine} puuid={puuid} />
      <div className="flex flex-wrap px-4 gap-2 justify-around max-w-screen-lg mx-auto">
        {sliceData.map((champ) => (
          <article
            key={getChampData(String(champ.championId)).name}
            className="relative"
          >
            <h2 className="text-center my-2">
              {getChampData(String(champ.championId)).name}
            </h2>
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${
                getChampData(String(champ.championId)).image
              }_0.jpg`}
              alt={`${getChampData(String(champ.championId)).name} image`}
              className="w-24 sm:w-32 md:w-44"
            />
            <img
              src={getSrc(champ.championLevel)}
              alt="mastery banner"
              className="w-12 sm:w-16 md:w-20 absolute -bottom-4 -left-2"
            />
            <img
              src={chest}
              alt="chest image"
              className={`${
                champ.chestGranted && "opacity-50"
              } w-8 sm:w-10 md:w-14 absolute -bottom-2 right-0`}
            />
            {/* <p>{champ.championPoints}</p> */}
            {/* <p>{convertTimestampToDate(champ.lastPlayTime)}</p> */}
          </article>
        ))}
      </div>
    </section>
  );
}
