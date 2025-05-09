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

function changeCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-form-input").value;
  let newCity = document.querySelector("#location");
  newCity.innerHTML = input;
}
let form = document.querySelector("#form");
form.addEventListener("submit", changeCity);
