const weatherContainer = document.querySelector("#weatherContainer");
const searchBtn = document.querySelector("#searchBtn");
const weatherDegree = document.querySelector("#weatherDegree");
const input = document.querySelector("#input");
const humid = document.querySelector("#humidity");
const wind = document.querySelector("#wind");

const API_KEY = "47c48550175b4f4aa00122044243007";
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json"; 

searchBtn.addEventListener("click", searchCountry);

function searchCountry() {
  const countryName = input.value.trim();
  if (countryName === "") {
    alert("Please enter a location.");
    return;
  }
  fetchCountry(countryName);
}

async function fetchCountry(countryName) {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${countryName}&days=7`
    );
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    createWeatherCondition(data);
    createWeatherDetails(data);
    createForecast(data.forecast.forecastday);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

function createWeatherCondition(data) {
  weatherDegree.innerHTML = `
    <img
      src=${data.current.condition.icon}
      alt="Weather Icon"
      class="mx-auto mb-2 w-24 h-24"
    />
    <p class="text-5xl font-bold text-gray-700">${data.current.temp_c}°C</p>
    <p class="text-xl text-gray-600 mt-2">${data.current.condition.text}</p>`;
}

function createWeatherDetails(data) {
  humid.innerHTML = `
    <p class="text-lg font-semibold mt-2">${data.current.humidity}%</p>
  `;
  wind.innerHTML = `
    <p class="text-lg font-semibold mt-2">${data.current.wind_kph} kph</p>
  `;
}

function createForecast(forecast) {
  const forecastContainer = document.querySelector("#forecast");
  forecastContainer.innerHTML = "";
  forecast.forEach((day) => {
    forecastContainer.innerHTML += `
      <div class="forecast-day bg-gray-200 p-2 rounded-lg text-center">
        <p class="font-semibold">${new Date(day.date).toDateString()}</p>
        <img src="${
          day.day.condition.icon
        }" alt="Weather Icon" class="w-12 h-12 mx-auto" />
        <p>Max: ${day.day.maxtemp_c}°C</p>
        <p>Min: ${day.day.mintemp_c}°C</p>
      </div>
    `;
  });
}
