import { useEffect, useState } from "react";
import { regions } from "./utils/regions";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function App() {
  const [region, setRegion] = useState("NA1");
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);
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

    try {
      const response = await axios.get(
        `http://localhost:3000/getPPUID?name=${gameName}&tag=${tagLine}`
      );
      const puuid = response.data.puuid;

      navigate("/summoner", { state: { puuid, gameName, tagLine } });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <main>
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
            disabled={disabledButton}
            className="rounded bg-blue-900 px-5 py-1 md:absolute md:mt-32 lg:mt-28 hover:shadow hover:shadow-stone-300 hover:bg-blue-600 transition disabled:opacity-50"
          >
            Search
          </button>
        </form>
      </main>
      <footer className="absolute bottom-0">
        <p className="text-center text-xs text-opacity-50 text-stone-200 px-10 py-4">
          This website is not endorsed by Riot Games and does not reflect the
          views or opinions of Riot Games or anyone officially involved in
          producing or managing Riot Games properties. Riot Games and all
          associated properties are trademarks or registered trademarks of Riot
          Games, Inc
        </p>
      </footer>
    </>
  );
}

export default App;
