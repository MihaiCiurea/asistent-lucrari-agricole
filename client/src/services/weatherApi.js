import axios from "axios";
import { getGeoLocation } from "./utils";

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/",
  headers: { Accept: "application/json" },
});

const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

console.log(API_KEY);
let forecast = null;

const getCurrentWeatherByLocation = () => {
  return new Promise((resolve, reject) => {
    getGeoLocation((location) => {
      weatherApi
        .get(
          `/weather?lat=${location.lat}&lon=${location.long}&units=metric&appid=${API_KEY}`
        )
        .then((res) => resolve(res.data))
        .catch((error) => reject(error));
    });
  });
};

const getCurrentWeatherByCity = (city) => {
  return weatherApi.get(`/weather?q=${city}&units=metric&appid=${API_KEY}`);
};

const getForecastByLocation = () => {
  if (forecast) return forecast;
  else {
    return new Promise((resolve, reject) => {
      getGeoLocation((location) => {
        weatherApi
          .get(
            `/forecast?lat=${location.lat}&lon=${location.long}&units=metric&appid=${API_KEY}`
          )
          .then((res) => {
            forecast = res.data;
            resolve(res.data);
          })
          .catch((error) => reject(error));
      });
    });
  }
};

const getForecastByCity = (city) => {
  return weatherApi.get(`/forecast?q=${city}&units=metric&appid=${API_KEY}`);
};

const getForecastForToday = (forecastData) => {
  const date = new Date();
  const offset = date.getTimezoneOffset();
  const dateWithOffset = new Date(date.getTime() - offset * 60 * 1000);
  const today = dateWithOffset.toISOString().split("T")[0];
  return forecastData.list.filter((obj) => obj.dt_txt.includes(today));
};

export {
  getCurrentWeatherByLocation,
  getCurrentWeatherByCity,
  getForecastByLocation,
  getForecastForToday,
  getForecastByCity,
};
