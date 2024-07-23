import SummonerBanner from "../components/SummonerBanner";
import { Outlet } from "react-router-dom";

export default function Summoner() {
  return (
    <section>
      <SummonerBanner className="p-2 m-auto" />
      <Outlet />
    </section>
  );
}
