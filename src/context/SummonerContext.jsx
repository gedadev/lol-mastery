import { createContext, useContext, useEffect, useState } from "react";
import { APIContext } from "./APIContext";

export const SummonerContext = createContext();

export default function SummonerProvider({ children }) {
  const { serverURL } = useContext(APIContext);
  const [summonerData, setSummonerData] = useState(null);
  const [topSummoners, setTopSummoners] = useState(null);

  useEffect(() => {
    const getTopSummoners = async () => {
      try {
        const response = await fetch(`${serverURL}/getTopPlayers`);
        const data = await response.json();
        setTopSummoners(data);
      } catch (error) {
        console.error(error);
      }
    };

    getTopSummoners();
  }, []);

  useEffect(() => {
    if (summonerData) {
      window.localStorage.setItem("summonerData", JSON.stringify(summonerData));
    }
  }, [summonerData]);

  useEffect(() => {
    const storedSummonerData = window.localStorage.getItem("summonerData");
    if (storedSummonerData) {
      setSummonerData(JSON.parse(storedSummonerData));
    }
  }, []);

  const resetData = () => {
    setSummonerData(null);
    window.localStorage.removeItem("summonerData");
  };

  const saveSummonerData = ({ gameName, tagLine }) => {
    const getPUUID = async () => {
      try {
        const response = await fetch(
          `${serverURL}/getPUUID?name=${gameName}&tag=${tagLine}`
        );
        const data = await response.json();
        const puuid = data.puuid;

        await getSummonerInfo({ puuid });
      } catch (error) {
        console.error(error);
      }
    };

    const getSummonerInfo = async ({ puuid }) => {
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

    getPUUID();
  };

  return (
    <SummonerContext.Provider
      value={{
        summonerData,
        saveSummonerData,
        resetData,
        topSummoners,
      }}
    >
      {children}
    </SummonerContext.Provider>
  );
}
