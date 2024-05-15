import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Summoner() {
  const location = useLocation();
  const puuid = location.state.puuid;
  const [champList, setChampList] = useState([]);

  useEffect(() => {
    const getChampList = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/getChampList?puuid=${puuid}`
        );
        setChampList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getChampList();
  }, [puuid]);

  return <div></div>;
}
