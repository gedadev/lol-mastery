import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { convertTimestampToDate } from "../../utils/epochConverter";
import { APIContext } from "../../APIContext";

export default function SummonerBanner({ gameName, tagLine, puuid }) {
  const [summonerInfo, setSummonerInfo] = useState({
    gameName: gameName,
    tagLine: tagLine,
    profileIconId: null,
    revisionDate: null,
    summonerLevel: null,
  });
  const { serverURL } = useContext(APIContext);

  useEffect(() => {
    const getIcon = async () => {
      try {
        const summonerData = await axios.get(
          `${serverURL}/getSummonerInfo?puuid=${puuid}`
        );
        setSummonerInfo((info) => ({
          ...info,
          profileIconId: summonerData.data.profileIconId,
          revisionDate: summonerData.data.revisionDate,
          summonerLevel: summonerData.data.summonerLevel,
        }));
      } catch (error) {
        console.error(error);
      }
    };

    getIcon();
  }, [puuid, serverURL]);

  return (
    <section className="mx-auto my-6 px-5 md:max-w-screen-xl flex gap-5 justify-between sm:justify-start">
      <div className="relative">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/${summonerInfo.profileIconId}.png`}
          alt={`${gameName}-icon`}
          className="max-w-28 rounded-full"
        />
        <div className="bg-red-800 rounded-full shadow-md shadow-stone-500 w-10 h-8 flex items-center justify-center absolute bottom-0 left-1/2 -ml-5 -mb-4">
          {summonerInfo.summonerLevel}
        </div>
      </div>
      <div className="self-center">
        <div className="sm:flex items-end gap-2">
          <h1 className="text-2xl sm:text-3xl">{gameName}</h1>
          <h2>#{tagLine}</h2>
        </div>
        <p className="opacity-50 col-span-2">
          Last update: {convertTimestampToDate(summonerInfo.revisionDate)}
        </p>
      </div>
    </section>
  );
}

SummonerBanner.propTypes = {
  gameName: PropTypes.string.isRequired,
  tagLine: PropTypes.string.isRequired,
  puuid: PropTypes.string.isRequired,
};
