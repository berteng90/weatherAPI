const searchbar = document.querySelector(".searchbar");

const fetchWeatherData = async (location) => {
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
      for (i = 0; i < weatherData.length; i++) {
        console.log(weatherData[i]);
      }
    });
};
fetchWeatherData("Don Carlos");

// OPEN WEATHER GEOLOCATION API
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// API FOR LAT LONG
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
