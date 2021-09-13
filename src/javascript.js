//Date and Time
function formatDate(timestamp) {
  let utcDate = new Date().getTime();
  let localTime = new Date(utcDate + timestamp);
  let localDate = localTime.getUTCDate();
  let localYear = localTime.getUTCFullYear();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let localDay = days[localTime.getUTCDay()];

  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let localMonth = months[localTime.getUTCMonth()];

  let localHour = localTime.getUTCHours();
  if (localHour > 12) {
    localHour = localHour - 12;
  }

  if (localHour < 10) {
    localHour = `0${localHour}`;
  }

  let ampm = "a.m.";
  if (localTime.getUTCHours() >= 12) {
    ampm = "p.m.";
  }

  let localMinute = localTime.getUTCMinutes();
  if (localMinute < 10) {
    localMinute = "0" + localMinute;
  }

  return `${localDate} ${localMonth} ${localYear} (${localDay})<br/>${localHour}:${localMinute} ${ampm}`;
}

//Search button & Temperature
function findCity(city) {
  let apiKey = "fd6d027787299da7fc57a8ab3840d713";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemperature);
}

function searchButton(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  findCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchButton);

function showCityTemperature(response) {
  console.log(response.data);
  celsiusTemperature = response.data.main.temp;
  let cityTemperature = Math.round(response.data.main.temp);

  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${response.data.name}`;

  let country = document.querySelector("#country-code");
  country.innerHTML = `${response.data.sys.country}`;

  let description = document.querySelector("#weather-description");
  description.innerHTML = `${response.data.weather[0].description}`;

  let currentTemperature = document.querySelector("#temperature-today");
  currentTemperature.innerHTML = cityTemperature;

  maxCelsiusTemperature = response.data.main.temp_max;
  let maxTemp = document.querySelector("#max-temp-today");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);

  minCelsiusTemperature = response.data.main.temp_min;
  let minTemp = document.querySelector("#min-temp-today");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed * 10) / 10;

  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  let timezoneMilliseconds = response.data.timezone * 1000;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(timezoneMilliseconds);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  celsiusButton.classList.remove("active");
  fahrenheitButton.classList.add("active");

  let temperatureElement = document.querySelector("#temperature-today");
  let maxCelTemp = document.querySelector("#max-temp-today");
  let minCelTemp = document.querySelector("#min-temp-today");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let maxFTemp = (maxCelsiusTemperature * 9) / 5 + 32;
  let minFTemp = (minCelsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  maxCelTemp.innerHTML = Math.round(maxFTemp);
  minCelTemp.innerHTML = Math.round(minFTemp);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");

  let temperatureElement = document.querySelector("#temperature-today");
  let maxCelTemp = document.querySelector("#max-temp-today");
  let minCelTemp = document.querySelector("#min-temp-today");

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  maxCelTemp.innerHTML = Math.round(maxCelsiusTemperature);
  minCelTemp.innerHTML = Math.round(minCelsiusTemperature);
}

let celsiusTemperature = null;
let maxCelsiusTemperature = null;
let minCelsiusTemperature = null;

let fahrenheitButton = document.querySelector("#degrees-fahrenheit");
fahrenheitButton.addEventListener("click", displayFahrenheitTemperature);

let celsiusButton = document.querySelector("#degrees-celsius");
celsiusButton.addEventListener("click", displayCelsiusTemperature);

//Home button & Current Location

function showLocation(position) {
  let apiKey = "fd6d027787299da7fc57a8ab3840d713";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemperature);
}

function showCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector("#home-button");
button.addEventListener("click", showCurrentPosition);

findCity("Malacca");
