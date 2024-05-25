import { useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function ChampionFilters() {
  const [activeFilters, setActiveFilters] = useState({
    role: false,
    difficulty: false,
    level: false,
    chest: false,
  });

  const handleClick = (e) => {
    setActiveFilters((prev) => {
      for (const key in prev) {
        if (prev[key] === true) {
          prev[key] = false;
        }
        if (key === e.target.name) {
          prev[key] = true;
        }
      }
      return { ...prev };
    });
  };

  return (
    <div className="text-xs px-4 py-2 mx-auto md:max-w-screen-xl flex gap-2 sm:gap-8 justify-around sm:justify-center">
      <button name="role" onClick={handleClick}>
        Role
      </button>
      <button name="difficulty" onClick={handleClick}>
        Difficulty
      </button>
      <button name="level" onClick={handleClick}>
        Level
      </button>
      <button name="chest" onClick={handleClick}>
        Chest Available
      </button>
      <CiSearch className="text-2xl" />
    </div>
  );
}
