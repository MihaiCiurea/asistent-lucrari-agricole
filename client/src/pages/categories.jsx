import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryNames, getDataByCategory } from "../services/db";
import { getImage } from "../services/utils";
import Card from "../components/card/card";

const Categories = () => {
  const [data, setData] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        if (params.category) {
          const result = await getDataByCategory(params.category);
          setData(result.data);
        } else {
          const result = await getCategoryNames();
          const categories = result.data;
          setData(categories.ro);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  });

  const handleRedirect = (cat) => {
    navigate(`/categories/${cat}`);
  };

  return (
    <>
      <div>
        <hr className="mt-4 mb-4 ms-2 me-2" />
        <h2>Categorii</h2>
        <div className="home-cards-container">
          {data &&
            data.map((cat) => (
              <Card
                title={cat.split(".")[0]}
                imgSrc={getImage(cat)}
                onClick={() => handleRedirect(cat)}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
