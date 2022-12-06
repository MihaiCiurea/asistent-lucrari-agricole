import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategoryNames, getDataByCategory } from "../services/db";
import { getImage } from "../services/utils";
import Card from "../components/card/card";

const Categorii = () => {
  const [data, setData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getCategoryNames();
        const categoriesRo = res.data;
        setData(categoriesRo);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleRedirect = (cat) => {
    navigate(`/categories/${cat}`);
  };

  return (
    <div>
      <hr className="mt-4 mb-4 ms-2 me-2" />
      <h2>Categorii</h2>
      <div className="home-cards-container">
        {Object.keys(data).map((cat) => (
          <Card
            title={cat}
            imgSrc={getImage(cat)}
            onClick={() => handleRedirect(cat)}
          />
        ))}
      </div>
    </div>
  );
};

export default Categorii;
