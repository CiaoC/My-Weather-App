//get current location
let currentLocation = document.querySelector("#home");
currentLocation.addEventListener("click", getCurrentLocation);

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "9c48a62dcc12a129cf6c63c31fa92ac6";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(showTemperature);

  apiURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(displayForecast);
}

//show various, current weather conditions/stats
function showTemperature(response) {
  document.querySelector("h1").innerHTML = response.data.name;
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#weatherIcon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#weatherIcon").setAttribute("alt", response.data.weather[0].description);
  document.querySelector("#forecastIcons").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#forecastIcon").setAttribute("alt", response.data.weather[0].description);
}

//display 5-day forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecastTemperature");
  let forecast = null;
  forecastElement.innerHTML = null;
  
  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-sm">
      <h5>
        ${formatHours(forecast.dt*1000)}
      </h5>
      <br /><img
                  src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
                  width="100x" 
                  height="100px" 
                  alt="clear" 
                  id="forecastIcons
                  class="forecast-icons"
                />
      <span class="temperature">${Math.round(forecast.main.temp_max)}°C/${Math.round(forecast.main.temp_min)}°C</span>
    </div>
  `;
  }
}

//Global city search (not current location)
function searchCity(city) {
  let apiKey = "9c48a62dcc12a129cf6c63c31fa92ac6";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(showTemperature);

  apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(displayForecast);
}

//Home city time
function formatDate(timestamp) {
  let now = new Date(timestamp);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}


//temperature conversions (from C to/from F)
let fTemp = document.querySelector("#fahrenheit");
fTemp.addEventListener("click", convertToFahrenheit);

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  let fahrenheit = Math.round((celsiusTemperature * 9) / 5 + 32);
  currentTemperature.innerHTML = fahrenheit;
}

let celsiusTemperature = null;

let cTemp = document.querySelector("#celsius");
cTemp.addEventListener("click", convertToCelsius);

function convertToCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
}

//search function
function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
  searchCity(cityInput.value);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Edmonton");
