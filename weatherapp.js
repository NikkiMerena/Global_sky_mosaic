const apiKey = 'f6fd5d5dc0d941209d8203319232004';
const timestamp = Date.now(); // Generate a timestamp

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

async function getWeatherData(location, tempUnit) {
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&${tempUnit}&custom_id=my_custom_id`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}



async function getData() {
  const location = document.getElementById('campus-select').value;
  const tempUnit = document.getElementById('temp-unit-select').value;
  const weatherData = await getWeatherData(location, `units=${tempUnit}`);
  const weatherInfo = document.getElementById('weather-info');
  const locationName = weatherData.location.name;
  const countryName = weatherData.location.country;
  const tempValue = tempUnit === 'C' ? weatherData.current.temp_c : weatherData.current.temp_f;
  const tempUnitText = tempUnit === 'C' ? '°C' : '°F';
  const weatherDescription = weatherData.current.condition.text;

  weatherInfo.innerHTML = `
    <h2>${locationName}, ${countryName}</h2>
    <p><strong>Temperature:</strong> ${tempValue}${tempUnitText}</p>
    <p><strong>Description:</strong> ${weatherDescription}</p>
  `;
}


async function updateWeather(location, tempUnit) {
  const weatherData = await getWeatherData(location, `units=${tempUnit}`);
  const weatherInfo = document.getElementById('weather-info');
  const locationName = weatherData.location.name;
  const countryName = weatherData.location.country;
  const tempValue = weatherData.current[tempUnit.toLowerCase()];
  const tempUnitText = tempUnit === 'C' ? '°C' : '°F';
  const weatherDescription = weatherData.current.condition.text;

  weatherInfo.innerHTML = `
    <h2>${locationName}, ${countryName}</h2>
    <p><strong>Temperature:</strong> ${tempValue}${tempUnitText}</p>
    <p><strong>Description:</strong> ${weatherDescription}</p>
  `;
}

// Fetch weather data for the initial campus
getData();

// Fetch weather data when the selected campus changes
const campusSelect = document.getElementById('campus-select');
campusSelect.addEventListener('change', () => {
  getData();
});

// Toggle temperature units when the selected unit changes
const tempUnitSelect = document.getElementById('temp-unit-select');
tempUnitSelect.addEventListener('change', () => {
  const location = document.getElementById('campus-select').value;
  const tempUnit = tempUnitSelect.value;
  updateWeather(location, tempUnit);
});

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
