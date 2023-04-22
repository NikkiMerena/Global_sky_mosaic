// Path: Global_sky_mosaic/weatherapp.js
const API_KEY = 'f6fd5d5dc0d941209d8203319232004';

function countryCodeToName (countryCode) {
  const countryCodes = {
    au: 'Australia',
    co: 'Colombia',
    ec: 'Ecuador',
    es: 'Spain',
    fr: 'France',
    gt: 'Guatemala',
    lb: 'Lebanon',
    ls: 'Lesotho',
    ly: 'Libya',
    mu: 'Mauritius',
    mx: 'Mexico',
    pa: 'Panama',
    pe: 'Peru',
    pr: 'Puerto Rico',
    tn: 'Tunisia',
    uy: 'Uruguay',
    za: 'South Africa',
    us: 'United States'
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

  console.log('Country code:', countryCode);
  // Add this line to log the country code
  console.log('Temperature in Celsius:', tempCelsius);
  console.log('Temperature in Fahrenheit:', tempFahrenheit);

  let tempDisplay;

  if (['US', 'BS', 'BZ', 'KY', 'PW'].includes(countryCode)) {
    tempDisplay = `${tempFahrenheit.toFixed(1)}°F`;
  } else {
    tempDisplay = `${tempCelsius.toFixed(1)}°C`;
  }

  const weatherInfo = document.getElementById('weather-info');
  weatherInfo.innerHTML = `
    <h2>${city}, ${countryCode}</h2>
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

//Function changes the background image based on which campus-select option is chosen
//If image doesn't exist, it defaults to the Tulsa image currently (will change this to clouds)
const select = document.querySelector('select#campus-select');
const body = document.body;
const defaultImage = 'images/Tulsa.png';

select.addEventListener('change', function() {
  const selectedCampus = select.value;
  const imagePath = `images/${selectedCampus}.png`;
  const imageExists = new Image();

  imageExists.src = imagePath;

  imageExists.onload = function() {
    body.style.backgroundImage = `url('${imagePath}')`;
  }

  imageExists.onerror = function() {
    body.style.backgroundImage = `url('${defaultImage}')`;
  }
});
