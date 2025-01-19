document.addEventListener('DOMContentLoaded', () => {
  const cityInput = document.querySelector('#city-input');
  const weatherInfo = document.querySelector('#weather-info');
  const cityDisplay = document.querySelector('#city-name');
  const tempDisplay = document.querySelector('#temperature');
  const descDisplay = document.querySelector('#description');
  const errorMsg = document.querySelector('#error-message');
  const form = document.querySelector('form');

  const API_KEY = "64e5581e396aeaf003eb8d101837e21f";

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const city = cityInput.value.trim();
    if(!city) return;

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch(error) {
      showError(error);
    }
  })

  
  async function fetchWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    
    if(!response.ok) {
      throw new Error("City Not Found.");
    }

    const data = await response.json();
    return data;
  }

  
  function displayWeatherData(data) {
    const { name, main, weather } = data;
    console.log(data);  
    
    cityDisplay.textContent = name;
    tempDisplay.textContent = `Temperature: ${main.temp}`;
    descDisplay.textContent = `Weather: ${weather[0].description}`;

    weatherInfo.classList.remove('hidden');
    weatherInfo.classList.add('flex');
    errorMsg.classList.add('hidden');
    errorMsg.classList.remove('flex');
  }


  function showError(error) {
    weatherInfo.classList.add('hidden');
    weatherInfo.classList.remove('flex');
    errorMsg.classList.remove('hidden');
    errorMsg.classList.add('flex');
    
    errorMsg.children[0].textContent = error;
  }
})