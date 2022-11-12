import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMonthsNames, getDataByMonth } from "../services/db";
import { getCurrentMonth } from "../services/utils";

const Operations = () => {
  const [data, setData] = useState();
  const params = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getMonthsNames();
        const currentMonth = getCurrentMonth(res.data);
        const data = await getDataByMonth(currentMonth);
        setData(data?.data?.operatiuni[params.operation]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  });
  console.log(data);
  return (
    <div className="operations-wrapper p-4">
      <h1 style={{ textTransform: "capitalize", textAlign: "center" }}>
        {params.operation}
      </h1>
      <hr />
      <div>
        {data &&
          Object.keys(data).map((k) => (
            <>
              <h2>{k}</h2>
              {k === "echipament" ? (
                <div className="d-flex justify-content-center align-items-center flex-wrap gap-4">
                  {data[k] &&
                    data[k]?.map((image) => (
                      <img
                        src={`/images/${image}.jpg`}
                        alt="echipament"
                        width={220}
                      />
                    ))}
                </div>
              ) : Array.isArray(data[k]) ? (
                <ol>
                  {data[k]?.map((proced) => (
                    <li>{proced}</li>
                  ))}
                </ol>
              ) : (
                <ol>
                  {Object.keys(data[k])?.map((ok) => (
                    <li>
                      {data[k][ok] &&
                        data[k][ok]?.map((proced) => <p>{proced}</p>)}
                    </li>
                  ))}
                </ol>
              )}
            </>
          ))}
      </div>
    </div>
  );
};

export default Operations;
