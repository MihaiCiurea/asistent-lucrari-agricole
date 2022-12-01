import { getImage } from "../services/utils";
import Card from "../components/card/card";

const Categorii = () => {
  return (
    <div>
      <hr className="mt-4 mb-4 ms-2 me-2" />
      <h2>Categorii</h2>
      <div className="home-cards-container">
        <Card title="Pomi fructiferi" imgSrc={getImage("pomi fructiferi")} />
        <Card title="Fructe de padure" imgSrc={getImage("fructe de padure")} />
      </div>
    </div>
  );
};

export default Categorii;
