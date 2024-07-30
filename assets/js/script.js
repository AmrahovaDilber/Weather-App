const weatherContainer = document.querySelector("#weatherContainer");
const searchBtn = document.querySelector("#searchBtn");
const weatherDetails = document.querySelector("#weatherDetails");
const weatherDegree = document.querySelector("#weatherDegree");
const input = document.querySelector("#input");
const humid = document.querySelector("#humidity");
const wind = document.querySelector("#wind");

const API_KEY = "47c48550175b4f4aa00122044243007";
const BASE_URL = "http://api.weatherapi.com/v1/current.json";

searchBtn.addEventListener("click", searchCountry);

function searchCountry() {
  const countryName = input.value.trim();
  if (countryName === "") {
    alert("Enter");
    return;
  }
  fetchCountry(countryName);
}

async function fetchCountry(countryName) {
  try {
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${countryName}`);
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }
    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.error(`Error:${error.message}`);
  }
}
