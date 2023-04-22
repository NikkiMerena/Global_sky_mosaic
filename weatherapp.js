// Path: Global_sky_mosaic/weatherapp.js
const API_KEY = 'f6fd5d5dc0d941209d8203319232004';

function countryCodeToName (countryCode) {
  const countryCodes = {
    AU: 'Australia',
    CO: 'Colombia',
    EC: 'Ecuador',
    ES: 'Spain',
    FR: 'France',
    GT: 'Guatemala',
    LB: 'Lebanon',
    LS: 'Lesotho',
    LY: 'Libya',
    MU: 'Mauritius',
    MX: 'Mexico',
    PA: 'Panama',
    PE: 'Peru',
    PR: 'Puerto Rico',
    TN: 'Tunisia',
    UY: 'Uruguay',
    ZA: 'South Africa',
    US: 'United States'
  };

  return countryCodes[countryCode] || countryCode;
}

function getData () {
  const cityAndCountryCode = document.getElementById('campus-select').value;
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityAndCountryCode}&aqi=no`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      displayWeatherData(data);
    })
    .catch((error) => {
      console.error('Error fetching weather data:', error);
    });
}

function displayWeatherData (data) {
  const tempFahrenheit = data.current.temp_f;
  const tempCelsius = data.current.temp_c;
  const description = data.current.condition.text;
  const city = data.location.name;
  const countryName = countryCodeToName(data.location.country);
  const countryCode = data.location.country;

  let tempDisplay;

  if (['US', 'BS', 'BZ', 'KY', 'PW'].includes(countryCode)) {
    tempDisplay = `${tempFahrenheit.toFixed(1)}°F`;
  } else {
    tempDisplay = `${tempCelsius.toFixed(1)}°C`;
  }

  const weatherInfo = document.getElementById('weather-info');
  weatherInfo.innerHTML = `
    <h2>${city}, ${countryName}</h2>
    <p>Temperature: ${tempDisplay}</p>
    <p>Weather: ${description}</p>
  `;
}

const campusSelect = document.getElementById('campus-select');

// Fetch weather data when the selected campus changes
campusSelect.addEventListener('change', (event) => {
  getData();
});

// Fetch weather data for the initial campus
getData();
