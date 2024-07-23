import { useContext } from "react";
import { FiltersContext } from "../context/FiltersContext";

export default function useFilters() {
  const context = useContext(FiltersContext);

  return context;
}
