import SearchForm from "../components/SearchForm";
import LeaderBoard from "../components/Leaderboard";

export default function Home() {
  return (
    <main className="flex-grow">
      <SearchForm />
      <LeaderBoard />
    </main>
  );
}
