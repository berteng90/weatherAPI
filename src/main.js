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
        console.log(weatherData[i]);
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
  console.log(lat, lon);
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=87eefaf1dae2bd0cc45a46101dfe1f24`,
    {
      mode: "cors",
      method: "GET",
    }
  )
    .then((data) => data.json())
    .then((weatherData) => console.log(weatherData));
};

// OPEN WEATHER GEOLOCATION API
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// API FOR LAT LONG
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
