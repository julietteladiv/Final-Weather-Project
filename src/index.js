let now = new Date();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let hours = now.getHours();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let currentDay = document.querySelector("#day");
currentDay.innerHTML = day;
let currentTime = document.querySelector("#time");
currentTime.innerHTML = `${hours}:${minutes}`;

function DisplayForecast(response) {
  let newCity = document.querySelector("#location");
  let newHumidity = document.querySelector("#humidity");
  let newWind = document.querySelector("#wind");
  let newTemperature = document.querySelector("#temperature");
  let newDescription = document.querySelector("#description");
  newCity.innerHTML = response.data.city;
  newHumidity.innerHTML = `${response.data.temperature.humidity} %`;
  newWind.innerHTML = `${response.data.wind.speed} km/h`;
  newTemperature.innerHTML = Math.round(response.data.temperature.current);
  newDescription.innerHTML = response.data.condition.description;
  console.log(response.data);
}
function getApi(city) {
  let apiKey = `625t01634a276d07f8dc7437o8d4abf9`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metrics`;
  axios.get(apiUrl).then(DisplayForecast);
}

function changeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-form-input");

  getApi(input.value);
}
let form = document.querySelector("#form");
form.addEventListener("submit", changeCity);
