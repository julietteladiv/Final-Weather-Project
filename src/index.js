function changeTheme() {
  let body = document.querySelector("body");
  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
  } else {
    body.classList.add("dark");
  }
}
let Themebutton = document.querySelector("#themeButton");
Themebutton.addEventListener("click", changeTheme);

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayWeather(response) {
  let newCity = document.querySelector("#location");
  let newHumidity = document.querySelector("#humidity");
  let newWind = document.querySelector("#wind");
  let newTemperature = document.querySelector("#temperature");
  let newDescription = document.querySelector("#description");
  let newImage = document.querySelector("#image");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let newDay = document.querySelector("#day");
  newDay.innerHTML = formatDay(date);

  newCity.innerHTML = response.data.city;
  newHumidity.innerHTML = `${response.data.temperature.humidity} %`;
  newWind.innerHTML = `${response.data.wind.speed} km/h`;
  newTemperature.innerHTML = Math.round(response.data.temperature.current);
  newDescription.innerHTML = response.data.condition.description;
  newImage.innerHTML = `<img src="${response.data.condition.icon_url}"/>`;
  timeElement.innerHTML = formatDate(date);
  console.log(response.data);
  getForecast(response.data.city);
}
function getApi(city) {
  let apiKey = `625t01634a276d07f8dc7437o8d4abf9`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function changeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-form-input");

  getApi(input.value);
}
function getForecast(city) {
  let apiKey = `625t01634a276d07f8dc7437o8d4abf9`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
           <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
          <div class="weather-forecast-temperatures"> 
            <div class="weather-forecast-temperature"><strong>${Math.round(
              day.temperature.maximum
            )}ºCS</strong> </div>
            <div class="weather-forecast-temperature"> ${Math.round(
              day.temperature.minimum
            )}°C </div> 
            </div> 
          </div>
          `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let form = document.querySelector("#form");
form.addEventListener("submit", changeCity);

getApi("Paris");
displayForecast("Paris");
