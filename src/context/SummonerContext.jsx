import { createContext, useContext, useState } from "react";
import championFull from "../assets/data/championFull.json";
import { APIContext } from "./APIContext";

export const SummonerContext = createContext();

export default function SummonerProvider({ children }) {
  const { serverURL } = useContext(APIContext);
  const [summonerData, setSummonerData] = useState({});

  const saveSummonerData = ({ puuid, gameName, tagLine }) => {
    const getSummonerInfo = async () => {
      try {
        const response = await fetch(
          `${serverURL}/getSummonerInfo?puuid=${puuid}`
        );
        const data = await response.json();
        const { profileIconId, revisionDate, summonerLevel } = data;

        setSummonerData({
          puuid,
          gameName,
          tagLine,
          profileIconId,
          revisionDate,
          summonerLevel,
        });
      } catch (error) {
        console.error(error);
      }
    };

    getSummonerInfo();
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
