//Date and Time
function showDate() {
  let now = new Date();

  let currentDate = now.getDate();
  let currentYear = now.getFullYear();

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let currentDay = days[now.getDay()];

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
  let currentMonth = months[now.getMonth()];

  let formatDate = document.querySelector("#full-date");
  formatDate.innerHTML = `${currentDate} ${currentMonth} ${currentYear} (${currentDay})`;

  let currentHour = now.getHours();
  if (currentHour > 12) {
    currentHour = currentHour - 12;
  }

  let ampm = "a.m.";
  if (now.getHours() >= 12) {
    ampm = "p.m.";
  }

  let currentMinute = now.getMinutes();
  if (currentMinute < 10) {
    currentMinute = "0" + currentMinute;
  }

  let formatTime = document.querySelector("#time");
  formatTime.innerHTML = `${currentHour}:${currentMinute} ${ampm}`;
}
showDate();

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
  let cityTemperature = Math.round(response.data.main.temp);
  let cityName = document.querySelector("#city-name");
  cityName.innerHTML = `${response.data.name}`;

  let country = document.querySelector("#country-code");
  country.innerHTML = `${response.data.sys.country}`;

  let description = document.querySelector("#weather-description");
  description.innerHTML = `${response.data.weather[0].main}`;

  let currentTemperature = document.querySelector("#temperature-today");
  currentTemperature.innerHTML = cityTemperature;

  let maxTemp = document.querySelector("#max-temp-today");
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);

  let minTemp = document.querySelector("#min-temp-today");
  minTemp.innerHTML = Math.round(response.data.main.temp_min);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed * 10) / 10;
}

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
