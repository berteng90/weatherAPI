(() => {
  const searchbar = document.querySelector(".searchbar");
  searchbar.addEventListener("input", () => {
    const cityName = searchbar.value;
    fetchWeatherDataLocation(cityName);
  });
})();

const fetchWeatherDataLocation = async (location) => {
  const loc = location;
  const response = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${loc}&limit=10&appid=87eefaf1dae2bd0cc45a46101dfe1f24`,
    {
      mode: "cors",
      method: "GET",
    }
  )
    .then((data) => data.json())
    .then((weatherData) => {
      const ul = document.querySelector("#searchbar-results");
      ul.innerHTML = "";
      for (i = 0; i < weatherData.length; i++) {
        const li = document.createElement("li");
        const locList = {
          name: weatherData[i].name,
          country: weatherData[i].country,
          state: weatherData[i].state,
          lat: weatherData[i].lat,
          lon: weatherData[i].lon,
        };
        li.textContent = `${locList.name}, ${locList.state} (${locList.country})`;
        ul.appendChild(li);
        li.addEventListener("click", () => {
          const searchbar = document.querySelector(".searchbar");
          ul.innerHTML = "";
          searchbar.value = li.textContent;
          fetchWeatherData(locList.lat, locList.lon);
        });
      }
    });
};

const fetchWeatherData = async (lat, lon) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=87eefaf1dae2bd0cc45a46101dfe1f24`,
    {
      mode: "cors",
      method: "GET",
    }
  )
    .then((data) => data.json())
    .then((weatherData) => populateData(weatherData));
};

const populateData = (weatherData) => {
  console.log(weatherData);
  const weatherInfo = document.querySelector(".weather-info").children;
  weatherInfo[0].textContent = parseFloat(
    (weatherData.main.temp - 273.15).toFixed(2)
  );
  weatherInfo[1].textContent = weatherData.weather[0].description;
  weatherInfo[2].textContent = weatherData.main.feels_like;
  weatherInfo[3].textContent = weatherData.main.humidity;
  weatherInfo[4].textContent = weatherData.wind.speed;

  // weatherAddress[0] = weatherData.main;
  // weatherAddress[1] =
  //   weatherAddress[2] =
  //   weatherData.weatherAddress[3] =
  //   weatherAddress[4] =
  //     console.log(weatherData.main.temp);
  // console.log(weatherAddress);
};

// OPEN WEATHER GEOLOCATION API
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// API FOR LAT LONG
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
