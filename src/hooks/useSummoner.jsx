import { useContext } from "react";
import { SummonerContext } from "../context/SummonerContext";

export default function useSummoner() {
  const context = useContext(SummonerContext);

  return context;
}
