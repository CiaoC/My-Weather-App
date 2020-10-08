//DATE & TIME
let now = new Date();
let h2 = document.querySelector("#date");
let hours = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
h2.innerHTML = `${day} ${hours}:${minutes}`;

//TEMPERATURE CONVERSION
function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = currentTemperature.innerHTML;
  currentTemperature.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fTemp = document.querySelector("#fahrenheit");
fTemp.addEventListener("click", convertToFahrenheit);

function convertToCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  let temperature = currentTemperature.innerHTML;
  currentTemperature.innerHTML = Math.round((temperature - 32) * (5 / 9));
}

let cTemp = document.querySelector("#celsius");
cTemp.addEventListener("click", convertToCelsius);

//CITY SEARCH, SHOW TEMPERATURE & OTHER WEATHER STATS
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
  searchCity(cityInput.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

function showTemperature(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
}
function searchCity(city) {
  let apiKey = "9c48a62dcc12a129cf6c63c31fa92ac6";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(showTemperature);
}
