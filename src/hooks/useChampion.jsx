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

  const getChampData = (champId, data) => {
    const champData = Object.values(championFull.data).find(
      (champ) => champ.key === String(champId)
    );

    return champData[data];
  };

  return { champList, getChampData };
}
