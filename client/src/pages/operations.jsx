import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMonthsNames, getDataByMonth } from "../services/api";
import { getCurrentMonth, getImage } from "../services/utils";

const Operations = () => {
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      const res = await getMonthsNames();
      const currentMonth = getCurrentMonth(res.data);
      const data = await getDataByMonth(currentMonth);
      console.log(data?.data?.operatiuni[params.operation]);
    }
    fetchData();
  }, []);
  return <div>{params.operation}</div>;
};

export default Operations;
