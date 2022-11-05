import React, { useEffect, useState, useRef } from "react";
import { getMonthsNames, getDataByMonth } from "../services/db";
import {
  getCurrentWeatherByLocation,
  getForecastByLocation,
  getForecastForToday,
  getCurrentWeatherByCity,
  getForecastByCity,
} from "../services/weatherApi";
import { getCurrentMonth, getImage } from "../services/utils";
import Card from "../components/card/card";
import { useNavigate } from "react-router-dom";
import WeatherCard from "../components/weatherCard/weatherCard";

const Home = () => {
  const [currentMonth, setCurrentMonth] = useState();
  const [currentWeather, setCurrentWeather] = useState();
  const [searchedCurrentWeather, setSearchedCurrentWeather] = useState();
  const [searchedForecastToday, setSearchedForecastToday] = useState();
  const [selectedWeatherCard, setSelectedWeatherCard] = useState();
  const [forecastDataForToday, setForecastDataForToday] = useState();
  const [data, setData] = useState();

  const navigate = useNavigate();

  const monthsRo = useRef();
  const forecast = useRef();

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
        setSelectedWeatherCard(weather.name);
        setForecastDataForToday(forecastForToday);
        forecast.current = {
          forecastByLocation: forecastForToday,
          forecastByCity: null,
        };
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  const handleRedirect = (op) => {
    navigate(`/operations/${op}`);
  };

  const handleGetWeather = async (value) => {
    try {
      const res = await getCurrentWeatherByCity(value);
      setSearchedCurrentWeather(res.data);
      const forecastData = await getForecastByCity(value);
      const fcToday = getForecastForToday(forecastData.data);
      console.log(forecast.current, forecastData.data);
      forecast.current.forecastByCity = fcToday;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectWeatherCard = (selectedCardObj, forecastType) => {
    console.log(forecast.current[forecastType], forecast.current);
    setSelectedWeatherCard(selectedCardObj.name);
    setForecastDataForToday(forecast.current[forecastType]);
  };

  return (
    <div className="home-container">
      <h1 className="text-center text-capitalize mb-2">{currentMonth}</h1>
      <div className="d-flex flex-wrap justify-content-center gap-4">
        {currentWeather && (
          <WeatherCard
            monthsRo={monthsRo}
            currentWeather={currentWeather}
            showSearch={false}
            onClick={() =>
              handleSelectWeatherCard(currentWeather, "forecastByLocation")
            }
          />
        )}
        <WeatherCard
          monthsRo={monthsRo}
          currentWeather={searchedCurrentWeather}
          showSearch={true}
          handleGetWeather={handleGetWeather}
          onClick={() =>
            handleSelectWeatherCard(searchedCurrentWeather, "forecastByCity")
          }
        />
      </div>
      <hr className="mt-4 mb-4 ms-2 me-2" />
      <h5 className="text-center mb-2">
        Prognoza Meteo {selectedWeatherCard || ""}
      </h5>
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
          <h2>Operatiunile care se efectueaza in aceasta luna</h2>
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
          <h2>Categorii</h2>
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
