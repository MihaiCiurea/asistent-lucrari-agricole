import db from "./db.json";

function getMonthsNames() {
  return { data: db.months };
}

function getDataByMonth(month) {
  return { data: db[month] };
}

function getCategoryNames() {
  return { data: db.categories };
}
function getDataByCategory(category) {
  return { data: db[category] };
}

export { getMonthsNames, getDataByMonth, getDataByCategory, getCategoryNames };
