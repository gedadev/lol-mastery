import FiltersProvider from "../context/FiltersContext.jsx";
import ChampionFilters from "./ChampionFilters.jsx";
import ChampionCard from "./ChampionCard.jsx";
import ChampionNav from "./ChampionNav.jsx";

export default function ChampionCardContainer() {
  return (
    <FiltersProvider>
      <ChampionFilters />
      <ChampionCard />
      <ChampionNav />
    </FiltersProvider>
  );
}
