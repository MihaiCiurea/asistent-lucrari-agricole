const imagesMap = {
  intretinere: "images/intretinere.jpg",
  "tratamente fitosanitare": "images/fito.jpg",
  recoltare: "images/recoltare.jpg",
  "pomi fructiferi": "images/pomiFructiferi.jpg",
  "fructe de padure": "images/fructePadure.jpg",
  irigare: "images/irigare.jpg",
  fertilizare: "images/fertilizare.jpg",
  taiere: "images/taiere.jpg",
  deparazitare: "images/deparazitare.jpg",
  plantare: "images/plantare.jpg",
  "vopsire trunchiuri": "images/vopsire.jpg",
};

function getGeoLocation(cb) {
  if (navigator.geolocation) {
    const geolocation = navigator.geolocation;
    geolocation.getCurrentPosition((loc) => {
      cb({
        long: loc.coords.longitude,
        lat: loc.coords.latitude,
      });
    });
  }
}

function getCurrentMonth(months) {
  const date = new Date();
  const currentMonth = date.getMonth();
  return months.ro[currentMonth];
}

function getImage(key) {
  return imagesMap[key];
}

function getFormatedDate(monthsArr) {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${day}-${monthsArr.ro[month]}-${year}`;
}

export { getCurrentMonth, getImage, getGeoLocation, getFormatedDate };
