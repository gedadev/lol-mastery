import { useLocation } from "react-router-dom";

export default function Summoner() {
  const location = useLocation();
  const puuid = location.state.puuid;

  return <p></p>;
}
