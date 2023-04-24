// Path: Global_sky_mosaic/weatherapp.js
const API_KEY = 'f6fd5d5dc0d941209d8203319232004';
const timestamp = Date.now(); // Generate a timestamp

function getData () {
  const cityAndCountryCode = document.getElementById('campus-select').value;
  const url = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityAndCountryCode}&aqi=no`;

  fetch(url)
    .then((response) => {
      console.log(response);
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
  console.log(tempFahrenheit)
  console.log(tempCelsius)
  const description = data.current.condition.text;
  const city = data.location.name;
  const countryName = data.location.country;

  let tempDisplay;
  console.log(countryCode);
  console.log(countryName);

  if (['United States of America', 'add other countries as needed'].includes(countryName)) {
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

//Function changes the background image based on which campus-select option is chosen
//If image doesn't exist, it defaults to the Tulsa image currently (will change this to clouds)
function setDefaultBackgroundImage() {
  var body = document.querySelector('body');
  var defaultImage = 'images/defaultTulsaHolb.png';
  body.style.backgroundImage = `url('${defaultImage}')`;
}

const select = document.querySelector('select#campus-select');
const body = document.body;
const defaultImage = 'images/Tulsa.png';

select.addEventListener('change', function() {
  const selectedCampus = select.value;
  const imagePath = `images/${selectedCampus}.png`;
  const imageExists = new Image();

  imageExists.src = imagePath;

  imageExists

  imageExists.onload = function() {
    body.style.backgroundImage = `url('${imagePath}')`;
  }

  imageExists.onerror = function() {
    body.style.backgroundImage = `url('${defaultImage}')`;
  }
});
