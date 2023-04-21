const API_KEY = 'f6fd5d5dc0d941209d8203319232004';
fetch(`/weather/${city}`)
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
