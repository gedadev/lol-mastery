import { convertTimestampToDate } from "../utils/epochConverter.js";
import chest from "../assets/img/chest.webp";
import { Link } from "react-router-dom";
import { importedMasteries } from "../utils/importMasteries.js";
import ChampionFilters from "./ChampionFilters.jsx";
import { useContext, useEffect, useState } from "react";
import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";
// import championFull from "../../assets/data/championFull.json";
import { APIContext } from "../context/APIContext.jsx";
import axios from "axios";
import { SummonerContext } from "../context/SummonerContext.jsx";

export default function ChampionCardContainer() {
  const [champList, setChampList] = useState([]);
  const { serverURL } = useContext(APIContext);
  const [filters, setFilters] = useState({
    role: [],
    difficulty: [],
    level: 10,
    chest: false,
    search: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [champsPerPage, setChampsPerPage] = useState(20);
  const [filteredChamps, setFilteredChamps] = useState([]);
  const totalPage = Math.ceil(filteredChamps.length / champsPerPage);
  const sliceData = filteredChamps.slice(
    (currentPage - 1) * champsPerPage,
    currentPage * champsPerPage
  );
  const [activeStats, setActiveStats] = useState(false);
  const { summonerData, getChampData } = useContext(SummonerContext);

  useEffect(() => {
    const getChampList = async () => {
      try {
        const response = await axios.get(
          `${serverURL}/getChampList?puuid=${summonerData.puuid}`
        );
        setChampList(response.data);
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

      setFilteredChamps(updatedList);
    };

    filterChamps();
  }, [filters, champList, getChampData]);

  // const getChampData = (champId) => {
  //   const champData = Object.values(championFull.data).find(
  //     (champ) => champ.key === champId
  //   );

  //   return {
  //     id: champId,
  //     name: champData.name,
  //     title: champData.title,
  //     image: champData.id,
  //     role: champData.tags,
  //     difficulty: champData.info.difficulty,
  //   };
  // };

  const getMasterySrc = (level) => {
    if (level > 10) level = 10;
    return importedMasteries[level - 1];
  };

  const handleFilters = (e, fieldset) => {
    setFilters((prev) => {
      if (Array.isArray(prev[fieldset])) {
        if (prev[fieldset].includes(e.target.value)) {
          return {
            ...prev,
            [fieldset]: prev[fieldset].filter(
              (item) => item !== e.target.value
            ),
          };
        }
        return { ...prev, [fieldset]: [...prev[fieldset], e.target.value] };
      }
      if (fieldset === "chest") return { ...prev, [fieldset]: !prev[fieldset] };
      return { ...prev, [fieldset]: e.target.value };
    });
  };

  const handleChampsPerPage = (e) => {
    setChampsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      role: [],
      difficulty: [],
      level: 10,
      chest: false,
      search: "",
    });
  };

  const handleStats = () => {
    setActiveStats((prev) => !prev);
  };

  return (
    <>
      <ChampionFilters
        filters={filters}
        handleFilters={handleFilters}
        handleChampsPerPage={handleChampsPerPage}
        champsPerPage={champsPerPage}
        resetFilters={resetFilters}
        handleStats={handleStats}
      />
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
      <div className="my-5 flex justify-center gap-3 md:text-xl">
        <button onClick={() => setCurrentPage(currentPage - 1)}>
          <MdNavigateBefore />
        </button>
        {Array.from({ length: totalPage }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={
              currentPage === i + 1
                ? "opacity-30 pointer-events-none"
                : "opacity-100 pointer-events-auto"
            }
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => setCurrentPage(currentPage + 1)}>
          <MdNavigateNext />
        </button>
      </div>
    </>
  );
}
