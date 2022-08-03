function displaySection(response) {
  let cityElement = document.querySelector("#city-name");
  let temperatureElement = document.querySelector("#displayed-temp");
  let descriptionElement = document.querySelector("#description");
  let feelsElement = document.querySelector("#feels-like");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  const apiKey = "b5d50f19d48c01a3eb81e79fb9ec7ed2";
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  const dailyForecast = response.data.daily;

  let forecastElement = document.querySelector(".forecast-week");
  let forecastHTML = ``;

  dailyForecast.forEach((forecastDay, index) => {
    if (index < 6 && index !== 0) {
      console.log(forecastDay);
      forecastHTML += `
    <div class="col-2">
              <p class="forecast-week-date">${formatDay(forecastDay.dt)}</p>
              <div class="img-container">
                <img
              src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png"
              alt="icon"
            />
              </div>
              <div class="forecast-week-temperatures">
                <span class="forecast-week-temperature-max">
                  ${Math.round(forecastDay.temp.max)}°
                </span>
                <span class="forecast-week-temperature-min">
                  ${Math.round(forecastDay.temp.min)}°
                </span>
              </div>
            </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
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

// Temperature

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#displayed-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperatureElement = document.querySelector("#displayed-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
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

let celsiusTemperature = null;

let submitForm = document.querySelector("#city-search");
submitForm.addEventListener("submit", hendleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Kobe");
