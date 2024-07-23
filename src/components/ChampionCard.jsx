import { useContext, useEffect, useState } from "react";
import { importedMasteries } from "../utils/importMasteries.js";
import { convertTimestampToDate } from "../utils/epochConverter.js";
import chest from "../assets/img/chest.webp";
import { Link } from "react-router-dom";
import { APIContext } from "../context/APIContext.jsx";
import useSummoner from "../hooks/useSummoner.jsx";
import useFilters from "../hooks/useFilters.jsx";

export default function ChampionCard() {
  const {
    filters,
    activeStats,
    filteredChamps,
    handleFilteredChamps,
    currentPage,
    champsPerPage,
  } = useFilters();
  const [champList, setChampList] = useState([]);
  const { serverURL } = useContext(APIContext);
  const sliceData = filteredChamps.slice(
    (currentPage - 1) * champsPerPage,
    currentPage * champsPerPage
  );
  const { summonerData, getChampData } = useSummoner();

  useEffect(() => {
    const getChampList = async () => {
      try {
        const response = await fetch(
          `${serverURL}/getChampList?puuid=${summonerData.puuid}`
        );
        const data = await response.json();
        setChampList(data);
      } catch (error) {
        console.log(error);
      }
    };

    getChampList();
  }, [summonerData, serverURL]);

  useEffect(() => {
    const filterChamps = () => {
      const updatedList = champList.filter((champ) => {
        const roleFilter = () => {
          if (filters.role.length > 0) {
            const champRoles = getChampData(String(champ.championId)).role.map(
              (role) => role.toLowerCase()
            );

            return filters.role.every((role) => champRoles.includes(role));
          }
        };
        const difficultyFilter = () => {
          if (filters.difficulty.length > 0) {
            const champDifficulty = getChampData(
              String(champ.championId)
            ).difficulty;
            const convertedDifficulty = () => {
              let difficultyValues = [];
              filters.difficulty.forEach((diff) => {
                if (diff === "easy") difficultyValues.push(1, 2, 3);
                if (diff === "medium") difficultyValues.push(4, 5, 6, 7);
                if (diff === "hard") difficultyValues.push(8, 9, 10);
              });
              return difficultyValues;
            };

            return convertedDifficulty().includes(champDifficulty);
          }
        };
        const levelFilter = () =>
          filters.level >= Math.min(champ.championLevel, 10);

        const chestFilter = () => {
          if (filters.chest) return !champ.chestGranted;
        };
        const searchFilter = () => {
          if (filters.search !== "") {
            const champName = getChampData(String(champ.championId)).name;
            return champName
              .toLowerCase()
              .includes(filters.search.toLowerCase());
          }
          return true;
        };
        const validChamp = [
          roleFilter(),
          difficultyFilter(),
          levelFilter(),
          chestFilter(),
          searchFilter(),
        ].reduce((acc, curr) => {
          if (curr === undefined) return acc;
          return acc && curr;
        }, true);

        return validChamp;
      });

      handleFilteredChamps(updatedList);
    };

    filterChamps();
  }, [filters, champList, getChampData]);

  const getMasterySrc = (level) => {
    if (level > 10) level = 10;
    return importedMasteries[level - 1];
  };

  return (
    <div className="flex flex-wrap px-4 gap-2 justify-around max-w-screen-lg mx-auto">
      {sliceData.map((champ) => (
        <article
          key={getChampData(String(champ.championId)).name}
          className="relative"
        >
          <h2 className="text-center my-2">
            {getChampData(String(champ.championId)).name}
          </h2>
          <Link to={`${champ.championId}`}>
            <div className="relative">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${
                  getChampData(String(champ.championId)).image
                }_0.jpg`}
                alt={`${getChampData(String(champ.championId)).name} image`}
                className="w-24 sm:w-32 md:w-44"
              />
              <div
                className={`${
                  activeStats ? "opacity-100" : "opacity-0"
                } absolute bottom-0 h-full w-full rounded bg-stone-800/80 transition flex flex-col p-2 md:p-4 text-center overflow-auto overflow-x-hidden ease-in-out	duration-300`}
              >
                <p className="text-sm md:text-lg mt-1">
                  {getChampData(String(champ.championId)).title}
                </p>
                <div className="flex justify-around text-xs flex-wrap opacity-70 mb-1">
                  {getChampData(String(champ.championId)).role.map((role) => (
                    <p key={role}>{role}</p>
                  ))}
                </div>
                <p className="text-xs md:text-sm opacity-70">
                  Level: {champ.championLevel}
                </p>
                <p className="text-xs md:text-sm opacity-70">
                  Points: {champ.championPoints}
                </p>
                <p className="mt-5 text-xs md:text-sm opacity-60">
                  Difficulty level:
                  {getChampData(String(champ.championId)).difficulty}
                </p>
                <p className="text-xs md:text-sm opacity-60">
                  Last Played: {convertTimestampToDate(champ.lastPlayTime)}
                </p>
                <p className="text-xs md:text-sm opacity-60">
                  Chest: {champ.chestGranted ? "Granted" : "Available"}
                </p>
              </div>
            </div>
          </Link>
          <img
            src={getMasterySrc(champ.championLevel)}
            alt="mastery banner"
            className="w-12 sm:w-16 md:w-20 absolute -bottom-4 -left-2"
          />
          <img
            src={chest}
            alt="chest image"
            className={`${
              !champ.chestGranted ? "opacity-50" : "opacity-100"
            } w-8 sm:w-10 md:w-14 absolute -bottom-2 right-0`}
          />
        </article>
      ))}
    </div>
  );
}
