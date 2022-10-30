import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
  headers: { Accept: "application/json" },
});

function getMonthsNames() {
  return instance.get("/months");
}

function getDataByMonth(month) {
  return instance.get(`/${month}`);
}

export { getMonthsNames, getDataByMonth };
