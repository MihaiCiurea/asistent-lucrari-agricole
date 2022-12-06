import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMonthsNames, getDataByMonth } from "../services/db";
import { getCurrentMonth, getImage } from "../services/utils";
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

    function renderRecursive(uiArr, depth = 0) {
      return uiArr
        .filter((obj) => !hasEmptyContent(obj))
        .map((obj) => {
          return (
            <>
              {renderSwitch(obj, depth)}
              <div className="equipment-cards-container">
                {obj?.content?.map((p) => {
                  return p.title
                    ? renderRecursive([p], depth + 1)
                    : p.includes(".jpg") || p.includes(".png")
                    ? renderImage(p)
                    : renderDescription(p);
                })}
              </div>
            </>
          );
        });
    }
    return renderRecursive(recursive(data));
  };

  function hasEmptyContent(obj) {
    if (obj.content && obj?.content?.length === 0) {
      return true;
    }

    return false;
  }
  function renderDescription(p) {
    return <p>{p}</p>;
  }
  function renderImage(p) {
    return <Card title={p.split(".")[0]} imgSrc={getImage(p)} />;
  }

  function renderSwitch(obj, depth) {
    switch (depth) {
      case 0:
        return <h4>{obj.title}</h4>;
      case 1:
        return <h5>{obj.title}</h5>;
      case 2:
        return <h6>{obj.title}</h6>;
      default:
        break;
    }
  }
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
