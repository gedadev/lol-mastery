import { useParams } from "react-router-dom";
import { useState } from "react";
import useChampion from "../hooks/useChampion.jsx";

export default function ChampionDetails() {
  const { championId } = useParams();
  const { getChampData } = useChampion();
  const [expand, setExpand] = useState(false);

  return (
    <div>
      <div className="bg-violet-900 py-2 mx-auto mt-8">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/centered/${getChampData(
            championId,
            "id"
          )}_0.jpg`}
          alt={`${getChampData(championId, "name")} Image`}
          className="w-full md:max-w-screen-xl h-auto mx-auto"
        />
        <p className="font-semibold text-2xl my-2 text-center">{`${getChampData(
          championId,
          "name"
        )}, ${getChampData(championId, "title")}`}</p>
      </div>
      <div className="flex flex-col md:flex-row w-full md:max-w-screen-xl mx-auto justify-center">
        <div className="mx-auto w-80">
          <h2 className="my-5">Champion Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            <article className="p-5 bg-violet-900 text-center rounded-md">
              Attack: {getChampData(championId, "info").attack}
            </article>
            <article className="p-5 bg-violet-900 text-center rounded-md">
              Defense: {getChampData(championId, "info").defense}
            </article>
            <article className="p-5 bg-violet-900 text-center rounded-md">
              Magic: {getChampData(championId, "info").magic}
            </article>
            <article className="p-5 bg-violet-900 text-center rounded-md">
              Difficulty: {getChampData(championId, "info").difficulty}
            </article>
          </div>
        </div>
        <div className="mx-auto w-80">
          <div className="flex justify-between my-5 items-center">
            <h2>Champion Abilities</h2>
            <p
              className="opacity-60 text-sm cursor-pointer"
              onClick={() => {
                setExpand(!expand);
              }}
            >
              {expand ? "Show Less" : "Show More"}
            </p>
          </div>
          <div className="flex flex-col gap-5">
            {getChampData(championId, "spells").map((spell, index) => (
              <div
                key={index}
                className={`${
                  expand ? "max-h-full" : "max-h-40"
                } w-80 p-5 bg-violet-900 rounded-md`}
              >
                <div className="flex justify-between">
                  <h3 className="self-center">{spell.name}</h3>
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/14.11.1/img/spell/${spell.id}.png`}
                    alt={`${spell.name} Image`}
                    className="w-10 h-10 justify-self-end rounded"
                  />
                </div>
                <div
                  className={`${
                    expand ? "max-h-full" : "max-h-20 overflow-hidden"
                  }`}
                >
                  <p className="pt-2 col-span-2 opacity-85">
                    {spell.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-violet-900 py-2 mx-auto mt-8">
        <div className="w-full md:max-w-screen-xl p-6 mx-auto">
          <h2 className="pb-4">Lore</h2>
          <p className="opacity-85">{getChampData(championId, "lore")}</p>
        </div>
      </div>
    </div>
  );
}
