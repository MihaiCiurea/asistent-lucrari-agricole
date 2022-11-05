import db from "./db.json";

function getMonthsNames() {
  return { data: db.months };
}

function getDataByMonth(month) {
  return { data: db[month] };
}

export { getMonthsNames, getDataByMonth };
