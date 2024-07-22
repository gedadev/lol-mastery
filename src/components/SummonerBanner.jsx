import useSummoner from "../hooks/useSummoner";
import { convertTimestampToDate } from "../utils/epochConverter";
import { Skeleton } from "@mui/material";

export default function SummonerBanner() {
  const { summonerData } = useSummoner();

  return (
    <>
      {summonerData ? (
        <section className="mx-auto my-6 px-5 md:max-w-screen-xl flex gap-5 justify-between sm:justify-start">
          <div className="relative">
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/${summonerData.profileIconId}.png`}
              alt={`${summonerData.gameName}-icon`}
              className="max-w-28 rounded-full"
            />
            <div className="bg-red-800 rounded-full shadow-md shadow-stone-500 w-10 h-8 flex items-center justify-center absolute bottom-0 left-1/2 -ml-5 -mb-4">
              {summonerData.summonerLevel}
            </div>
          </div>
          <div className="self-center">
            <div className="sm:flex items-end gap-2">
              <h1 className="text-2xl sm:text-3xl">{summonerData.gameName}</h1>
              <h2>#{summonerData.tagLine}</h2>
            </div>
            <p className="opacity-50 col-span-2">
              Last update: {convertTimestampToDate(summonerData.revisionDate)}
            </p>
          </div>
        </section>
      ) : (
        <div className="p-5 flex items-center gap-5">
          <Skeleton
            variant="circular"
            animation="wave"
            width={110}
            height={110}
          />
          <Skeleton variant="text" animation="wave" width={250} height={100} />
        </div>
      )}
    </>
  );
}
