const API_KEY = "Hidden just for privacy";
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search-btn');
const errorMsg = document.querySelector('#error-msg');
const loading = document.querySelector('#loading');
const weatherCard = document.querySelector('#weather-card');
const historySection = document.querySelector('#history-section');
const historyList = document.querySelector('#history-list');

const cityName = document.querySelector('#city-name');
const cityCountry = document.querySelector('#city-country');
const weatherIcon = document.querySelector('#weather-icon');
const tempMain = document.querySelector('#temp-main');
const tempDesc = document.querySelector('#temp-desc');
const tempFeels = document.querySelector('#temp-feels');
const humidity = document.querySelector('#humidity');
const windSpeed = document.querySelector('#wind-speed');
const visibility = document.querySelector('#visibility');
const feelsLike = document.querySelector('#feels-like');
const tempMax = document.querySelector('#temp-max');
const tempMin = document.querySelector('#temp-min');

let searchHistory = JSON.parse(localStorage.getItem('weatherHistory')) || [];
function saveHistory(city){
    city = city.trim();
    searchHistory = searchHistory.filter(c=> c.toLowerCase() !== city.toLowerCase()
    );
    searchHistory.unshift(city);
    if(searchHistory.length > 5) {searchHistory.pop() };
    localStorage.setItem('weatherHistory',JSON.stringify(searchHistory));
    renderHistory();
}

function  renderHistory(){
    if(searchHistory.length === 0){
    historySection.classList.add('hidden');
        return;
    }

    historySection.classList.remove('hidden');
    historyList.innerHTML = "";

    searchHistory.forEach(city => {
        const btn = document.createElement('button');
        btn.classList.add('history-item');
        btn.textContent = city;
        btn.addEventListener('click',function(){
            cityInput.value = city;
            getWeather(city);
        });
        historyList.appendChild(btn);
    });
}


function getWeatherEmoji(weatherId) {
  if (weatherId >= 200 && weatherId < 300) return '⛈️';
  if (weatherId >= 300 && weatherId < 400) return '🌦️';
  if (weatherId >= 500 && weatherId < 600) return '🌧️';
  if (weatherId >= 600 && weatherId < 700) return '🌨️';
  if (weatherId >= 700 && weatherId < 800) return '🌫️';
  if (weatherId === 800) return '☀️';
  if (weatherId === 801) return '🌤️';
  if (weatherId === 802) return '⛅';
  if (weatherId >= 803) return '☁️';
  return '🌡️';
}

async function getWeather(city){
    if(!city.trim()){
        cityInput.focus();
        return;
    }
   errorMsg.classList.add('hidden');
   weatherCard.classList.add('hidden');
   loading.classList.remove('hidden');

   try {
    const url = `${API_URL}?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);

     if (!response.ok) {
      throw new Error('City not found');
    }

    const data = await response.json();
    displayWeather(data);
    saveHistory(city);

   }
   catch(error){
    loading.classList.add('hidden');
    errorMsg.classList.remove('hidden');
    weatherCard.classList.add('hidden');
   }
}

function displayWeather(data){
    loading.classList.add('hidden')
    weatherCard.classList.remove('hidden');
    errorMsg.classList.add('hidden');

    cityName.textContent = data.name;
    cityCountry.textContent = `${data.sys.country} • ${data.weather[0].description}`
    weatherIcon.textContent = getWeatherEmoji(data.weather[0].id);
    tempMain.textContent = `${Math.round(data.main.temp)}°C`;
    tempDesc.textContent = data.weather[0].description;
    tempFeels.textContent = `Feels like ${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;
    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    tempMax.textContent = `${Math.round(data.main.temp_max)}°C`;
    tempMin.textContent = `${Math.round(data.main.temp_min)}°C`;

}
cityInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') getWeather(cityInput.value);
});

searchBtn.addEventListener('click', function() {
  getWeather(cityInput.value);
});

renderHistory();
getWeather('Srinagar');

