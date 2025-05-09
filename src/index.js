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

function DisplayForecast(response) {
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
}
function getApi(city) {
  let apiKey = `625t01634a276d07f8dc7437o8d4abf9`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(DisplayForecast);
}

function changeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-form-input");

  getApi(input.value);
}

let form = document.querySelector("#form");
form.addEventListener("submit", changeCity);
