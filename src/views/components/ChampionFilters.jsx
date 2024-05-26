import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdCloseFullscreen } from "react-icons/md";

export default function ChampionFilters({ handleFilters }) {
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
          <fieldset className="absolute left-0 origin-bottom-right mt-2 z-10 bg-indigo-800 w-40 p-5 flex flex-col gap-2 justify-center rounded-md shadow-lg shadow-stone-500">
            <MdCloseFullscreen
              className="absolute top-0 right-0 mr-2 mt-2 cursor-pointer opacity-50 hover:opacity-100 transition"
              onClick={closeFilters}
            />
            <article>
              <input
                onChange={(e) => handleFilters(e, "role")}
                type="checkbox"
                id="assassin"
                name="assassin"
                value="assassin"
                className="mr-2"
              />
              <label htmlFor="assassin">Assassin</label>
            </article>
            <article>
              <input
                onChange={(e) => handleFilters(e, "role")}
                type="checkbox"
                id="fighter"
                name="fighter"
                value="fighter"
                className="mr-2"
              />
              <label htmlFor="fighter">Fighter</label>
            </article>
            <article>
              <input
                onChange={(e) => handleFilters(e, "role")}
                type="checkbox"
                id="marksman"
                name="marksman"
                value="marksman"
                className="mr-2"
              />
              <label htmlFor="marksman">Marksman</label>
            </article>
            <article>
              <input
                onChange={(e) => handleFilters(e, "role")}
                type="checkbox"
                id="mage"
                name="mage"
                value="mage"
                className="mr-2"
              />
              <label htmlFor="mage">Mage</label>
            </article>
            <article>
              <input
                onChange={(e) => handleFilters(e, "role")}
                type="checkbox"
                id="support"
                name="support"
                value="support"
                className="mr-2"
              />
              <label htmlFor="support">Support</label>
            </article>
            <article>
              <input
                onChange={(e) => handleFilters(e, "role")}
                type="checkbox"
                id="tank"
                name="tank"
                value="tank"
                className="mr-2"
              />
              <label htmlFor="tank">Tank</label>
            </article>
          </fieldset>
        )}
      </div>
      <div className="relative">
        <button name="difficulty" onClick={handleClick}>
          Difficulty
        </button>
        {activeFilters.difficulty && (
          <fieldset className="absolute left-0 origin-bottom-right mt-2 z-10 bg-indigo-800 w-40 p-5 flex flex-col gap-2 justify-center rounded-md shadow-lg shadow-stone-500">
            <MdCloseFullscreen
              className="absolute top-0 right-0 mr-2 mt-2 cursor-pointer opacity-50 hover:opacity-100 transition"
              onClick={closeFilters}
            />
            <article>
              <input
                onChange={(e) => handleFilters(e, "difficulty")}
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
                onChange={(e) => handleFilters(e, "difficulty")}
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
                onChange={(e) => handleFilters(e, "difficulty")}
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
          <div className="absolute right-0 sm:left-0 origin-bottom-right mt-2 z-10 bg-indigo-800 w-40 py-6 px-4 rounded-md shadow-lg shadow-stone-500 flex justify-between items-center">
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
              onChange={(e) => {
                setChampLevel(e.target.value);
                handleFilters(e, "level");
              }}
              className="w-24"
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
          <div className="absolute right-0 sm:left-0 origin-bottom-right mt-2 z-10 bg-indigo-800 w-40 p-6 rounded-md shadow-lg shadow-stone-500 flex justify-center gap-2">
            <MdCloseFullscreen
              className="absolute top-0 right-0 mr-2 mt-2 cursor-pointer opacity-50 hover:opacity-100 transition"
              onClick={closeFilters}
            />
            <label htmlFor="chest">Available:</label>
            <input
              type="checkbox"
              id="chest"
              name="chest"
              value="chest"
              onChange={(e) => handleFilters(e, "chest")}
            />
          </div>
        )}
      </div>
      <CiSearch className="text-2xl" />
    </div>
  );
}
