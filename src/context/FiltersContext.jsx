import { createContext, useEffect, useState } from "react";
import useChampion from "../hooks/useChampion";

export const FiltersContext = createContext();

export default function FiltersProvider({ children }) {
  const [filters, setFilters] = useState({
    role: [],
    difficulty: [],
    level: 10,
    chest: false,
    search: "",
  });
  const [filteredChamps, setFilteredChamps] = useState([]);
  const [champsPerPage, setChampsPerPage] = useState(20);
  const [activeStats, setActiveStats] = useState(false);
  const totalPage = Math.ceil(filteredChamps.length / champsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const { champList, getChampData } = useChampion();

  useEffect(() => {
    const filterChamps = () => {
      const updatedList = champList.filter((champ) => {
        const roleFilter = () => {
          if (filters.role.length > 0) {
            const champRoles = getChampData(champ.championId, "tags").map(
              (role) => role.toLowerCase()
            );

            return filters.role.every((role) => champRoles.includes(role));
          }
        };
        const difficultyFilter = () => {
          if (filters.difficulty.length > 0) {
            const champDifficulty = getChampData(
              champ.championId,
              "info"
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
            const champName = getChampData(champ.championId, "name");
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
  }, [filters, champList]);

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

  const resetFilters = () => {
    setFilters({
      role: [],
      difficulty: [],
      level: 10,
      chest: false,
      search: "",
    });
  };

  const handleChampsPerPage = (e) => {
    setChampsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleStats = () => {
    setActiveStats((prev) => !prev);
  };

  const handleFilteredChamps = (newData) => {
    setFilteredChamps(newData);
  };

  const handleCurrentPage = (page) => {
    setCurrentPage(page);
  };

  return (
    <FiltersContext.Provider
      value={{
        filters,
        handleFilters,
        resetFilters,
        handleChampsPerPage,
        handleStats,
        champsPerPage,
        activeStats,
        totalPage,
        filteredChamps,
        currentPage,
        handleFilteredChamps,
        handleCurrentPage,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
