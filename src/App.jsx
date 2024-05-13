import { useEffect, useState } from "react";
import { regions } from "./utils/regions";

function App() {
  const [region, setRegion] = useState("NA1");
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [disabledButton, setDisabledButton] = useState(true);

  useEffect(() => {
    if (gameName && tagLine) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [gameName, tagLine]);

  return (
    <main>
      <form className="flex items-center flex-col my-20 gap-5 md:flex-row md:justify-center md:relative">
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
  );
}

export default App;
