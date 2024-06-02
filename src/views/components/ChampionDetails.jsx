import { useParams } from "react-router-dom";

export default function ChampionDetails() {
  const { championId } = useParams();

  return <p>details page: {championId}</p>;
}
