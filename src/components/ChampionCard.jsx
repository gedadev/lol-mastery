import { importedMasteries } from "../utils/importMasteries.js";
import { convertTimestampToDate } from "../utils/epochConverter.js";
import chest from "../assets/img/chest.webp";
import { Link } from "react-router-dom";
import useFilters from "../hooks/useFilters.jsx";
import useChampion from "../hooks/useChampion.jsx";

export default function ChampionCard() {
  const { activeStats, filteredChamps, currentPage, champsPerPage } =
    useFilters();
  const { getChampData } = useChampion();
  const sliceData = filteredChamps.slice(
    (currentPage - 1) * champsPerPage,
    currentPage * champsPerPage
  );

  const getMasterySrc = (level) => {
    if (level > 10) level = 10;
    return importedMasteries[level - 1];
  };

  const handleChampData = (id, data) => {
    return getChampData(String(id))[data];
  };

  return (
    <div className="flex flex-wrap px-4 gap-2 justify-around max-w-screen-lg mx-auto">
      {sliceData.map((champ) => (
        <article
          key={handleChampData(champ.championId, "name")}
          className="relative"
        >
          <h2 className="text-center my-2">
            {handleChampData(champ.championId, "name")}
          </h2>
          <Link to={`${champ.championId}`}>
            <div className="relative">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${handleChampData(
                  champ.championId,
                  "image"
                )}_0.jpg`}
                alt={`${handleChampData(champ.championId, "name")} image`}
                className="w-24 sm:w-32 md:w-44"
              />
              <div
                className={`${
                  activeStats ? "opacity-100" : "opacity-0"
                } absolute bottom-0 h-full w-full rounded bg-stone-800/80 transition flex flex-col p-2 md:p-4 text-center overflow-auto overflow-x-hidden ease-in-out	duration-300`}
              >
                <p className="text-sm md:text-lg mt-1">
                  {handleChampData(champ.championId, "title")}
                </p>
                <div className="flex justify-around text-xs flex-wrap opacity-70 mb-1">
                  {handleChampData(champ.championId, "role").map((role) => (
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
                  {handleChampData(champ.championId, "difficulty")}
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
