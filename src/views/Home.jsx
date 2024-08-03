import SearchForm from "../components/SearchForm";
import LeaderBoard from "../components/LeaderBoard";

export default function Home() {
  return (
    <main className="flex-grow">
      <SearchForm />
      <LeaderBoard />
    </main>
  );
}
