import { createContext, useState } from "react";
import championFull from "../assets/data/championFull.json";

export const SummonerContext = createContext();

export default function SummonerProvider({ children }) {
  const [summonerData, setSummonerData] = useState({});

  const saveSummonerData = (puuid, gameName, tagLine) => {
    setSummonerData({ puuid, gameName, tagLine });
  };

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

  return (
    <SummonerContext.Provider
      value={{ summonerData, saveSummonerData, getChampData }}
    >
      {children}
    </SummonerContext.Provider>
  );
}
