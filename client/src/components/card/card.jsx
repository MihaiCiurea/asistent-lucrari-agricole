import "./card.css";

const Card = ({ imgSrc, title, description, onClick }) => {
  return (
    <div className="card-container" onClick={onClick}>
      <h4>{title}</h4>
      <img src={imgSrc} alt="..." />
      <p>{description}</p>
    </div>
  );
};

export default Card;
