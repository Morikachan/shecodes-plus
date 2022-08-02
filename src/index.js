function displaySection(response) {
  console.log(response);
  let cityElement = document.querySelector("#city-name");
  let tempElement = document.querySelector("#displayed-temp");
  let descriptionElement = document.querySelector("#description");
  let feelsElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

// Search func

function search(city) {
  const apiKey = "b5d50f19d48c01a3eb81e79fb9ec7ed2";
  const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(displaySection);
}

function hendleSubmit(event) {
  event.preventDefault();

  let cityInput = document.querySelector("#city-search-input");
  const cityValue = cityInput.value.toLowerCase();
  search(cityValue);
}

// Time

function currTimeChange() {
  const date = new Date();

  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayElement = document.querySelector("#day-and-time");

  const day = weekDays[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  dayElement.innerHTML = `${day}, ${hours}:${minutes}`;
}

currTimeChange();

let submitForm = document.querySelector("#city-search");
submitForm.addEventListener("submit", hendleSubmit);

search("Kobe");
