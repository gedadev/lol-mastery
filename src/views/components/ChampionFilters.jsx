import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { MdCloseFullscreen } from "react-icons/md";

export default function ChampionFilters({
  filters,
  handleFilters,
  handleChampsPerPage,
  champsPerPage,
}) {
  const [activeFilters, setActiveFilters] = useState({
    role: false,
    difficulty: false,
    level: false,
    chest: false,
  });
  const [activeSearch, setActiveSearch] = useState(false);

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

  const handleChecked = (name, set) => {
    if (filters[set].includes(name)) {
      return true;
    }
    return false;
  };

  const handleSearch = () => {
    setActiveSearch((prev) => !prev);
  };

  return (
    <>
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
                  checked={handleChecked("assassin", "role")}
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
                  checked={handleChecked("fighter", "role")}
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
                  checked={handleChecked("marksman", "role")}
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
                  checked={handleChecked("mage", "role")}
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
                  checked={handleChecked("support", "role")}
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
                  checked={handleChecked("tank", "role")}
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
                  checked={handleChecked("easy", "difficulty")}
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
                  checked={handleChecked("medium", "difficulty")}
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
                  checked={handleChecked("hard", "difficulty")}
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
                value={filters.level}
                type="range"
                name="level"
                id="level"
                min="1"
                max="10"
                onChange={(e) => {
                  handleFilters(e, "level");
                }}
                className="w-24"
              />
              <span>
                {Number(filters.level) >= 10
                  ? `${filters.level}+`
                  : filters.level}
              </span>
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
                checked={filters.chest}
                type="checkbox"
                id="chest"
                name="chest"
                value="chest"
                onChange={(e) => handleFilters(e, "chest")}
              />
            </div>
          )}
        </div>
      </div>
      <div className="text-xs px-4 py-2 mx-auto md:max-w-screen-xl flex gap-2 sm:gap-8 justify-around sm:justify-center relative">
        <div>
          <label htmlFor="champsPerPage">Champs Per Page</label>
          <select
            name="champsPerPage"
            id="champsPerPage"
            className="rounded-md p-1 bg-stone-800/80 transition ml-1"
            onChange={handleChampsPerPage}
            value={champsPerPage}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <button>Reset Filters</button>
        <button>Show Stats</button>
        <div>
          <input
            type="text"
            name="search"
            id="search"
            className={`absolute left-1/2 -translate-x-1/2 w-${
              activeSearch ? "60" : "0"
            } h-${activeSearch ? "8" : "0"} p-${
              activeSearch ? "2" : "0"
            } rounded-md text-stone-800 ease-in-out	duration-300`}
          />
          <CiSearch
            className="text-2xl cursor-pointer"
            onClick={handleSearch}
          />
        </div>
      </div>
    </>
  );
}
