import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMonthsNames, getDataByMonth } from "../services/db";
import { getCurrentMonth } from "../services/utils";
import Card from "../components/card/card";

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

  const renderContent = () => {
    if (!data) return;

    function recursive(obj) {
      const keys = Object.keys(obj);
      return keys.map((k) => ({
        title: k,
        content: Array.isArray(obj[k]) ? obj[k] : recursive(obj[k]),
      }));
    }

    function renderRecursive(uiArr) {
      const data = uiArr[1];
      console.log(data);
      // return (
      //   <>
      //     <h5>{data.title}</h5>
      //     <div className="home-cards-container">
      //       {data.content.map((p) =>
      //         p.title ? (
      //           renderRecursive([p])
      //         ) : p.includes(".jpg") || p.includes(".png") ? (
      //           <Card
      //             title={"echipament" && console.log(p)}
      //             imgSrc={`/images/${p}`}
      //             // onClick={() => handleRedirect(op)}
      //           />
      //         ) : (
      //           p
      //         )
      //       )}
      //     </div>
      //   </>
      // );

      return uiArr.map((obj, index) => {
        return (
          <>
            <h5>{obj.title}</h5>
            <div className="equipment-cards-container">
              {obj?.content?.map((p) => {
                return (
                  // <ol className="m-2">
                  p.title ? (
                    renderRecursive([p])
                  ) : p.includes(".jpg") || p.includes(".png") ? (
                    <Card
                      title={"echipament"}
                      imgSrc={`/images/${p}`}
                      // onClick={() => handleRedirect(op)}
                    />
                  ) : (
                    // <img src={`/images/${p}`} alt="..." width={220} />
                    p
                  )
                  // </ol>
                );
              })}
            </div>
          </>
        );
      });
    }
    return renderRecursive(recursive(data));
  };

  return (
    <div className="operations-wrapper p-4">
      <h1 style={{ textTransform: "capitalize", textAlign: "center" }}>
        {params.operation}
      </h1>
      <hr />
      {renderContent()}
    </div>
  );
};

export default Operations;
