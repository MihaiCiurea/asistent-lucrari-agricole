import React, { useEffect, useState, useRef } from "react";
import { getMonthsNames, getDataByMonth } from "../services/api";
import {
  getCurrentWeatherByLocation,
  getForecastByLocation,
  getForecastForToday,
} from "../services/weatherApi";
import { getCurrentMonth, getImage, getFormatedDate } from "../services/utils";
import Card from "../components/card/card";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [currentMonth, setCurrentMonth] = useState();
  const [currentWeather, setCurrentWeather] = useState();
  const [forecastDataForToday, setForecastDataForToday] = useState();
  const [data, setData] = useState();

  const navigate = useNavigate();

  const monthsRo = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        const weather = await getCurrentWeatherByLocation();
        const foreCast = await getForecastByLocation();
        const forecastForToday = getForecastForToday(foreCast);
        const res = await getMonthsNames();
        monthsRo.current = res.data;
        const month = getCurrentMonth(res.data);
        const data = await getDataByMonth(month);
        setData(data.data);
        setCurrentMonth(month);
        setCurrentWeather(weather);
        setForecastDataForToday(forecastForToday);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleRedirect = (op) => {
    navigate(`/operations/${op}`);
  };

  console.log(forecastDataForToday);

  return (
    <div className="home-container">
      <h1 className="text-center text-capitalize mb-2">{currentMonth}</h1>
      {currentWeather && (
        <div className="d-flex flex-wrap justify-content-center">
          <div className="home-weather-card">
            <img
              src={
                "http://openweathermap.org/img/wn/" +
                currentWeather?.weather[0]?.icon +
                "@2x.png"
              }
              alt="weather icon"
            />
            <p className="m-0">{currentWeather.name}</p>
            <p className="m-0">{currentWeather?.weather[0]?.description}</p>
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
              <span>Pressure:</span>
              {currentWeather.main.pressure}hPa
            </p>
          </div>
        </div>
      )}
      <hr className="mt-4 mb-4 ms-2 me-2" />
      <div className="d-flex flex-wrap gap-3 justify-content-center">
        {forecastDataForToday &&
          forecastDataForToday.map((obj) => (
            <div className="home-weather-card">
              <p>{obj.dt_txt.split(" ")[1]}</p>
              <img
                src={
                  "http://openweathermap.org/img/wn/" +
                  obj?.weather[0]?.icon +
                  "@2x.png"
                }
                alt="weather icon"
              />
              <p className="m-0">{obj?.main?.temp}C&#176;</p>
              <p className="m-0">{obj?.main?.humidity}%</p>
            </div>
          ))}
      </div>
      <hr className="mt-4 mb-4 ms-2 me-2" />
      {data && (
        <>
          <h2>Operatiunile care se efectueaza in aceasta luna </h2>
          <div className="home-cards-container">
            {Object.keys(data.operatiuni).map((op) => (
              <Card
                title={op}
                imgSrc={getImage(op)}
                onClick={() => handleRedirect(op)}
              />
            ))}
          </div>
          <hr className="mt-4 mb-4 ms-2 me-2" />
          <div className="home-cards-container">
            <Card
              title="Pomi fructiferi"
              imgSrc={getImage("pomi fructiferi")}
            />
            <Card title="Legume" imgSrc={getImage("legume")} />
            <Card
              title="Fructe de padure"
              imgSrc={getImage("fructe de padure")}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
