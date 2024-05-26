import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdCloseFullscreen } from "react-icons/md";

export default function ChampionFilters() {
  const [champLevel, setChampLevel] = useState("10");
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

  const closeFilters = () => {
    setActiveFilters((prev) => {
      for (const key in prev) {
        prev[key] = false;
      }
      return { ...prev };
    });
  };

  return (
    <div className="text-xs px-4 py-2 mx-auto md:max-w-screen-xl flex gap-2 sm:gap-8 justify-around sm:justify-center">
      <div className="relative">
        <button name="role" onClick={handleClick}>
          Role
        </button>
        {activeFilters.role && (
          <div className="absolute left-0 -bottom-20 z-10 bg-indigo-800 w-40 py-5 flex justify-center rounded-md shadow-lg shadow-stone-500">
            <MdCloseFullscreen
              className="absolute top-0 right-0 mr-2 mt-2 cursor-pointer opacity-50 hover:opacity-100 transition"
              onClick={closeFilters}
            />
            <label htmlFor="role"></label>
            <select
              name="role"
              id="role"
              className="text-stone-900 rounded h-8 px-2 w-28 mt-1"
            >
              <option value={null}>Select...</option>
              <option value="assassin">Assassin</option>
              <option value="fighter">Fighter</option>
              <option value="marksman">Marksman</option>
              <option value="mage">Mage</option>
              <option value="support">Support</option>
              <option value="tank">Tank</option>
            </select>
          </div>
        )}
      </div>
      <div className="relative">
        <button name="difficulty" onClick={handleClick}>
          Difficulty
        </button>
        {activeFilters.difficulty && (
          <fieldset className="absolute left-0 -bottom-28 z-10 bg-indigo-800 w-40 p-5 flex flex-col gap-2 justify-center rounded-md shadow-lg shadow-stone-500">
            <MdCloseFullscreen
              className="absolute top-0 right-0 mr-2 mt-2 cursor-pointer opacity-50 hover:opacity-100 transition"
              onClick={closeFilters}
            />
            <article>
              <input
                type="checkbox"
                id="easy"
                name="easy"
                value="easy"
                className="mr-2"
              />
              <label htmlFor="easy">Easy</label>
            </article>
            <article>
              <input
                type="checkbox"
                id="medium"
                name="medium"
                value="medium"
                className="mr-2"
              />
              <label htmlFor="medium">Medium</label>
            </article>
            <article>
              <input
                type="checkbox"
                id="hard"
                name="hard"
                value="hard"
                className="mr-2"
              />
              <label htmlFor="hard">Hard</label>
            </article>
          </fieldset>
        )}
      </div>
      <div className="relative">
        <button name="level" onClick={handleClick}>
          Level
        </button>
        {activeFilters.level && (
          <div className="absolute -left-10 sm:left-0 -bottom-16 z-10 bg-indigo-800 w-40 py-5 px-4 rounded-md shadow-lg shadow-stone-500 flex justify-between items-center">
            <MdCloseFullscreen
              className="absolute top-0 right-0 mr-2 mt-2 cursor-pointer opacity-50 hover:opacity-100 transition"
              onClick={closeFilters}
            />
            <label htmlFor="level" className="absolute"></label>
            <input
              type="range"
              name="level"
              id="level"
              min="1"
              max="10"
              onChange={(e) => setChampLevel(e.target.value)}
              className="w-24 mt-1"
            />
            <span>{champLevel === "10" ? `${champLevel}+` : champLevel}</span>
          </div>
        )}
      </div>
      <div className="relative">
        <button name="chest" onClick={handleClick}>
          Chest
        </button>
        {activeFilters.chest && (
          <div className="absolute -left-24 sm:left-0 -bottom-16 z-10 bg-indigo-800 w-40 p-5 rounded-md shadow-lg shadow-stone-500 flex justify-center gap-2">
            <MdCloseFullscreen
              className="absolute top-0 right-0 mr-2 mt-2 cursor-pointer opacity-50 hover:opacity-100 transition"
              onClick={closeFilters}
            />
            <label htmlFor="chest" className="mt-1">
              Available:
            </label>
            <input type="checkbox" id="chest" name="chest" value="chest" />
          </div>
        )}
      </div>
      {/* <CiSearch className="text-2xl" /> */}
    </div>
  );
}
