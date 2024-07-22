import { useState } from "react";

export default function useFilters() {
  const [filters, setFilters] = useState({
    role: [],
    difficulty: [],
    level: 10,
    chest: false,
    search: "",
  });

  const handleFilters = (e, fieldset) => {
    setFilters((prev) => {
      if (Array.isArray(prev[fieldset])) {
        if (prev[fieldset].includes(e.target.value)) {
          return {
            ...prev,
            [fieldset]: prev[fieldset].filter(
              (item) => item !== e.target.value
            ),
          };
        }
        return { ...prev, [fieldset]: [...prev[fieldset], e.target.value] };
      }
      if (fieldset === "chest") return { ...prev, [fieldset]: !prev[fieldset] };
      return { ...prev, [fieldset]: e.target.value };
    });
  };

  const resetFilters = () => {
    setFilters({
      role: [],
      difficulty: [],
      level: 10,
      chest: false,
      search: "",
    });
  };

  return { filters, handleFilters, resetFilters };
}
