import { useContext, useEffect, useState } from "react";
import { APIContext } from "../context/APIContext";
import useSummoner from "./useSummoner";

export default function useChampion() {
  const [champList, setChampList] = useState([]);
  const { serverURL } = useContext(APIContext);
  const { summonerData } = useSummoner();
  const [championFull, setChampionFull] = useState();
  const [assetsURL, setAssetsURL] = useState("");

  useEffect(() => {
    setAssetsURL(
      "https://pub-1d0f11ab543f45ecb624359bc1a436a7.r2.dev/mastery-assests"
    );
  }, []);

  useEffect(() => {
    const source =
      "https://ddragon.leagueoflegends.com/cdn/14.23.1/data/en_US/championFull.json";

    const getData = async () => {
      const response = await fetch(source);
      const data = await response.json();
      setChampionFull(data);
    };

    getData();

    return () => {
      setChampionFull(null);
    };
  }, []);

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

  return { champList, getChampData, championFull, assetsURL };
}
