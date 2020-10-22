//get current location
let currentLocation = document.querySelector("#home");
currentLocation.addEventListener("click", getCurrentLocation)

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function searchLocation(position) {
  let apiKey = "9c48a62dcc12a129cf6c63c31fa92ac6";
  let apiURL = `http://api.openweathermap.org/data/2.5/?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(showTemperature);
}

//show various, current weather conditions/stats
function showTemperature(response) {
  console.log(response.data);
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  document.querySelector("#date").innerHTML = formatDate(response.data.dt * 1000);
  document.querySelector("#weatherIcon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#weatherIcon").setAttribute("alt", response.data.weather[0].description);
}

//display 5-day forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecastTemperature");
  let forecast = null;
  forecastElement.innerHTML = null;
  
  for (let index = 0; index < 5; index++){
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-sm">
      <h5 id="dayofweek"> Mon </h5>
      <br /><i class="fas fa-sun" id="forecastIcon"></i>
      <p class="temperature">${Math.round(forecast.main.temp_max)}°C/${Math.round(forecast.main.temp_min)}°C</p>
      </div >
    </div>
  `;
  }
}

//Global city search (not current location)
function searchCity(city) {
  let apiKey = "9c48a62dcc12a129cf6c63c31fa92ac6";
  let apiURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(showTemperature);

  apiURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(displayForecast);
};

//Home city time
function formatDate(timestamp) {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  h2.innerHTML = `${day} ${hours}:${minutes}`;
}


//temperature conversions (from C to F & F to C)
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


