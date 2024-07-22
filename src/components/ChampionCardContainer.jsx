import ChampionFilters from "./ChampionFilters.jsx";
import { useState } from "react";

import ChampionCard from "./ChampionCard.jsx";
import ChampionNav from "./ChampionNav.jsx";

export default function ChampionCardContainer() {
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
  const [activeStats, setActiveStats] = useState(false);

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
      <ChampionCard
        activeStats={activeStats}
        setFilteredChamps={setFilteredChamps}
        filteredChamps={filteredChamps}
        filters={filters}
        currentPage={currentPage}
        champsPerPage={champsPerPage}
      />
      <ChampionNav
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}
