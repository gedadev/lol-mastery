import { useContext, useEffect, useState } from "react";
import { APIContext } from "../context/APIContext";
import useSummoner from "./useSummoner";
import championFull from "../assets/data/championFull.json";

export default function useChampion() {
  const [champList, setChampList] = useState([]);
  const { serverURL } = useContext(APIContext);
  const { summonerData } = useSummoner();

  useEffect(() => {
    const getChampList = async () => {
      if (summonerData) {
        const response = await fetch(
          `${serverURL}/getChampList?puuid=${summonerData.puuid}`
        );
        const data = await response.json();
        setChampList(data);
      }
    };

    getChampList();
  }, [summonerData, serverURL]);

  const getChampData = (champId) => {
    const champData = Object.values(championFull.data).find(
      (champ) => champ.key === champId
    );

    return {
      name: champData.name,
      title: champData.title,
      image: champData.id,
      role: champData.tags,
      difficulty: champData.info.difficulty,
      lore: champData.lore,
      stats: champData.info,
      spells: champData.spells,
    };
  };

  return { champList, getChampData };
}
