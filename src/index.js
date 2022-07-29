const date = new Date();

let cityValue = "Kobe";

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const apiURL = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "b5d50f19d48c01a3eb81e79fb9ec7ed2";
const request = `${apiURL}?q=${cityValue}&lang=en&units=metric&appid=${apiKey}`;

let dayElement = document.querySelector("#day-and-time");

let submitForm = document.querySelector("#city-search");
let cityHeading = document.querySelector("#city-name");
submitForm.addEventListener("submit", citySubmit);

let displayedTemp = document.querySelector("#displayed-temp");

function showInfo(response) {
  console.log(response);
  const cityName = response.data.name;
  const cityTemp = response.data.main.temp;

  cityHeading.innerHTML = `${cityName}`;
  displayedTemp.innerHTML = `${Math.round(cityTemp)}`;
}

axios.get(request).then(showInfo);

// Search func

function citySubmit(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-search-input");
  const cityValue = cityInput.value.toLowerCase();
  const request = `${apiURL}?q=${cityValue}&lang=en&units=metric&appid=${apiKey}`;
  axios.get(request).then(showInfo);
}

// Time

function currTimeChange() {
  const day = weekDays[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  dayElement.innerHTML = `${day} &nbsp ${hours}:${minutes}`;
}

currTimeChange();
