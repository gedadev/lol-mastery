import { useContext, useEffect, useState } from "react";
import { regions } from "../utils/regions";
import { useNavigate } from "react-router-dom";
import { SummonerContext } from "../context/SummonerContext";
import ErrorPage from "./ErrorPage";

export default function SearchForm() {
  const [region, setRegion] = useState("NA1");
  const [gameName, setGameName] = useState("l0boDomestikad0");
  const [tagLine, setTagLine] = useState("5701");
  const [disabledButton, setDisabledButton] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { saveSummonerData } = useContext(SummonerContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (gameName && tagLine) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [gameName, tagLine]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      saveSummonerData({ gameName, tagLine });
      navigate("/summoner");
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = () => {
    setError(!error);
  };

  return (
    <>
      {!error ? (
        <form
          className="flex items-center flex-col my-20 gap-5 md:flex-row md:justify-center md:relative"
          onSubmit={handleSubmit}
        >
          <div className="w-auto flex flex-col gap-2 lg:flex-row lg:items-center">
            <label htmlFor="region">Select region:</label>
            <select
              name="region"
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="text-stone-900 rounded h-8 px-2"
            >
              {regions.map((region) => (
                <option key={region.url} value={region.url}>
                  {region.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-auto flex flex-col gap-2 lg:flex-row lg:items-center">
            <label htmlFor="name">Game Name:</label>
            <input
              type="text"
              id="name"
              className="text-stone-900 rounded h-8 px-2"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <div className="w-auto flex flex-col gap-2 lg:flex-row lg:items-center">
            <label htmlFor="tag">Tag Line:</label>
            <input
              type="text"
              id="tag"
              className="text-stone-900 rounded h-8 px-2"
              value={tagLine}
              onChange={(e) => setTagLine(e.target.value)}
              required
              autoComplete="off"
            />
          </div>
          <button
            type="submit"
            disabled={disabledButton || isLoading}
            className="rounded bg-blue-900 px-5 py-1 md:absolute md:mt-32 lg:mt-28 hover:shadow hover:shadow-stone-300 hover:bg-blue-600 transition disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Search"}
          </button>
        </form>
      ) : (
        <ErrorPage handleError={handleError} />
      )}
    </>
  );
}
