import React from "react";
import useSummoner from "../hooks/useSummoner";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Leaderboard() {
  const { topSummoners, saveSummonerData } = useSummoner();
  const navigate = useNavigate();

  const handleSummonerChamps = (summoner) => {
    const { gameName, tagLine } = summoner;

    try {
      saveSummonerData({ gameName, tagLine });
      navigate("/summoner");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-4 md:mx-auto max-w-screen-md">
      <p className="my-4">Leaderboard SoloQ Challenger</p>
      {topSummoners ? (
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-center text-sm sm:text-base">
              <th className="px-2">#</th>
              <th className="text-left">Summoner Name</th>
              <th>Points</th>
              <th>Level</th>
              <th>Wins</th>
              <th>Losses</th>
            </tr>
          </thead>
          <tbody className="opacity-75 text-xs sm:text-sm">
            {topSummoners.map((summoner, index) => (
              <React.Fragment key={summoner.puuid}>
                <tr
                  className="text-center h-10 cursor-pointer hover:bg-violet-600 transition-all duration-200"
                  onClick={() => handleSummonerChamps(summoner)}
                >
                  <td className="rounded-l-lg">{index + 1}</td>
                  <td>
                    <div className="flex gap-2 items-center">
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/14.10.1/img/profileicon/${summoner.profileIconId}.png`}
                        alt={`${summoner.gameName} profile icon`}
                        className="w-8 h-8 rounded-full"
                      />
                      <p className="text-left w-min sm:w-auto">
                        {summoner.gameName}
                      </p>
                      <p>#{summoner.tagLine}</p>
                    </div>
                  </td>
                  <td>{summoner.leaguePoints}</td>
                  <td>{summoner.summonerLevel}</td>
                  <td>{summoner.wins}</td>
                  <td className="rounded-r-lg">{summoner.losses}</td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <Skeleton className="w-full my-3" height={40} variant="rounded" />
          <Skeleton className="w-full my-3" height={40} variant="rounded" />
          <Skeleton className="w-full my-3" height={40} variant="rounded" />
          <Skeleton className="w-full my-3" height={40} variant="rounded" />
          <Skeleton className="w-full my-3" height={40} variant="rounded" />
        </>
      )}
    </div>
  );
}
