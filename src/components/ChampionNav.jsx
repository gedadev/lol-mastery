import { MdNavigateBefore } from "react-icons/md";
import { MdNavigateNext } from "react-icons/md";

export default function ChampionNav({
  totalPage,
  currentPage,
  setCurrentPage,
}) {
  return (
    <div className="my-5 flex justify-center gap-3 md:text-xl">
      <button onClick={() => setCurrentPage(currentPage - 1)}>
        <MdNavigateBefore />
      </button>
      {Array.from({ length: totalPage }, (_, i) => (
        <button
          key={i}
          onClick={() => setCurrentPage(i + 1)}
          className={
            currentPage === i + 1
              ? "opacity-30 pointer-events-none"
              : "opacity-100 pointer-events-auto"
          }
        >
          {i + 1}
        </button>
      ))}
      <button onClick={() => setCurrentPage(currentPage + 1)}>
        <MdNavigateNext />
      </button>
    </div>
  );
}
