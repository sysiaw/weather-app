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
  if (localTime.getUTCHours() >= 12 && localTime.getUTCHours() < 23) {
    ampm = "p.m.";
  }

  let localMinute = localTime.getUTCMinutes();
  if (localMinute < 10) {
    localMinute = "0" + localMinute;
  }

  return `${localDate} ${localMonth} ${localYear} (${localDay})<br/>${localHour}:${localMinute} ${ampm}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = ``;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-3">
                  <h4><span class="forecast-date">${formatDay(
                    forecastDay.dt
                  )}</span></h4>
                </div>
                <div class="col-4">
                  <img
                    src="http://openweathermap.org/img/wn/${
                      forecastDay.weather[0].icon
                    }@2x.png"
                    alt=""
                  />
                </div>
                <div class="col-5">
                  <h3>
                    <span class="forecast-max-temp">${Math.round(
                      forecastDay.temp.max
                    )}°</span> /
                    <span class="forecast-min-temp">${Math.round(
                      forecastDay.temp.min
                    )}°</span>
                  </h3>
                </div>
              </div>
            </div>
          </div>
              `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function backgroundColor(response) {
  let body = document.querySelector("body");
  let timeNow = Date.now();

  let sunRise = response.data.sys.sunrise * 1000;
  let sunSet = response.data.sys.sunset * 1000;

  if (timeNow === sunRise) {
    body.classList.remove("nightTime", "dayTime", "sunset");
    body.classList.add("sunrise");
  } else {
    if (timeNow > sunRise && timeNow < sunSet) {
      body.classList.remove("sunrise", "sunset", "nightTime");
      body.classList.add("dayTime");
    } else {
      if (timeNow === sunSet) {
        body.classList.remove("dayTime", "nightTime", "sunrise");
        body.classList.add("sunset");
      } else {
        body.classList.remove("sunset", "sunrise", "dayTime");
        body.classList.add("nightTime");
      }
    }
  }
}

function findCity(city) {
  let apiKey = "fd6d027787299da7fc57a8ab3840d713";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemperature);
  axios.get(apiUrl).then(backgroundColor);
}

function searchButton(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  findCity(city);
  celsiusButton.classList.add("active");
  fahrenheitButton.classList.remove("active");
}

function getForecast(coordinates) {
  let apiKey = "fd6d027787299da7fc57a8ab3840d713";
  let forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(forecastUrl).then(displayForecast);
}

function showCityTemperature(response) {
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

  getForecast(response.data.coord);
}

function showLocation(position) {
  let apiKey = "fd6d027787299da7fc57a8ab3840d713";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityTemperature);
  axios.get(apiUrl).then(backgroundColor);
}

function showCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

let button = document.querySelector("#home-button");
button.addEventListener("click", showCurrentPosition);

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchButton);

let celsiusTemperature = null;
let maxCelsiusTemperature = null;
let minCelsiusTemperature = null;

findCity("Malacca");
