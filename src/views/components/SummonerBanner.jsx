import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axios from "axios";

export default function SummonerBanner({ gameName, tagLine, puuid }) {
  const [imgUrl, setImgUrl] = useState(false);
  const [summonerInfo, setSummonerInfo] = useState({
    gameName: gameName,
    tagLine: tagLine,
    profileIconId: null,
    revisionDate: null,
    summonerLevel: null,
  });

  useEffect(() => {
    const getIcon = async () => {
      try {
        const summonerData = await axios.get(
          `http://localhost:3000/getSummonerInfo?puuid=${puuid}`
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
  }, [puuid]);

  useEffect(() => {
    const getImg = async () => {
      try {
        const img = await import(
          `../../assets/img/profileicon/${summonerInfo.profileIconId}.png`
        );
        const url = await img.default;
        setImgUrl(url);
      } catch (error) {
        console.error(error);
      }
    };

    getImg();
  }, [summonerInfo]);

  return (
    <section className="mx-auto my-6 md:max-w-screen-xl flex gap-10 items-end">
      <div className="relative">
        <img
          src={imgUrl}
          alt={`${gameName}-icon`}
          className="max-w-28 rounded-full"
        />
        <div className="bg-red-800 rounded-full shadow-md shadow-stone-500 w-10 h-8 flex items-center justify-center absolute bottom-0 left-1/2 -ml-5 -mb-4">
          {summonerInfo.summonerLevel}
        </div>
      </div>
      <div className="self-center">
        <div className="flex items-end gap-2">
          <h1 className="text-3xl">{gameName}</h1>
          <h2>#{tagLine}</h2>
        </div>
        <p className="opacity-50 col-span-2">
          Last update: {summonerInfo.revisionDate}
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
