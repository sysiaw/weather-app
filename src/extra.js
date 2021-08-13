//Forecast
let futureOne = days[now.getDay() + 1];
let dayOne = document.querySelector(".forecastDayOne");
dayOne.innerHTML = `${futureOne}`;

let futureTwo = days[now.getDay() + 2];
let dayTwo = document.querySelector(".forecastDayTwo");
dayTwo.innerHTML = `${futureTwo}`;

let futureThree = days[now.getDay() + 3];
let dayThree = document.querySelector(".forecastDayThree");
dayThree.innerHTML = `${futureThree}`;

let futureFour = days[now.getDay() + 4];
let dayFour = document.querySelector(".forecastDayFour");
dayFour.innerHTML = `${futureFour}`;

let futureFive = days[now.getDay() + 5];
let dayFive = document.querySelector(".forecastDayFive");
dayFive.innerHTML = `${futureFive}`;

//Temperature Change
let temp = document.querySelector(".temperature");

function changeFahrenheit() {
  temp.innerHTML = "79";
}
let fahrenheitButton = document.querySelector("#degrees-fahrenheit");
fahrenheitButton.addEventListener("click", changeFahrenheit);

function changeCelsius() {
  temp.innerHTML = "26";
}
let celsiusButton = document.querySelector("#degrees-celsius");
celsiusButton.addEventListener("click", changeCelsius);
