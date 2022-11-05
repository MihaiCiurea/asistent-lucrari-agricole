import { useRef } from "react";
import { getFormatedDate } from "../../services/utils";
import "./weatherCard.css";

const WeatherCard = ({
  currentWeather,
  monthsRo,
  showSearch,
  handleGetWeather,
  onClick,
}) => {
  const searchRef = useRef();

  return (
    <div className="weather-card-container">
      {currentWeather ? (
        <div
          className="d-flex flex-wrap justify-content-center"
          style={{ cursor: "pointer" }}
          onClick={onClick}
        >
          <div className="home-weather-card">
            <img
              src={
                "http://openweathermap.org/img/wn/" +
                currentWeather?.weather[0]?.icon +
                "@2x.png"
              }
              alt="weather icon"
            />
            <p className="m-0">{currentWeather?.weather[0]?.description}</p>
            <p className="m-0">
              <span>{currentWeather.name}</span>
            </p>
          </div>
          <div className="home-weather-card">
            <p className="m-0">
              <span>{getFormatedDate(monthsRo.current)}</span>
            </p>
            <p className="m-0">
              <span>Viteza Vantului</span>
              {currentWeather.wind.speed}m/s
            </p>
            <p className="m-0">
              <span>Temperatura:</span>
              {currentWeather.main.temp}C&#176;
            </p>
            <p className="m-0">
              <span>Umiditate:</span>
              {currentWeather.main.humidity}%
            </p>
            <p className="m-0">
              <span>Presiune:</span>
              {currentWeather.main.pressure}hPa
            </p>
          </div>
        </div>
      ) : showSearch ? (
        <p>Cauta locatia</p>
      ) : (
        <p>Nu exista date pentru vreme</p>
      )}
      {showSearch && (
        <div>
          <input placeholder="Cauta oras" ref={searchRef} />
          <button onClick={() => handleGetWeather(searchRef.current.value)}>
            Search
          </button>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
