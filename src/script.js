function formatDate(date) {
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
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMin = date.getMinutes();
  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }
  let time = document.querySelector("h3");
  time.innerHTML = `${day} ${currentHour}:${currentMin} `;
}
let now = new Date();
formatDate(now);

function showWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

function searchCity(city) {
  let apiKey = "de138cd364fa1d6a533d399c201b10b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "de138cd364fa1d6a533d399c201b10b9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currLocation = document.querySelector("#current");
currLocation.addEventListener("click", currentLocation);

searchCity("London");

function changeCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector(".unit-number");
  celsius.innerHTML = `15°C`;
}
function changeFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector(".unit-number");
  fahrenheit.innerHTML = `59°F`;
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
