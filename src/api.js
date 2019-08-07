const request = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    return await response.json();
  } catch (e) {
    console.log(e);
    return e;
  }
};

const basicCache = {};

export const fetchWeather = async city => {
  if (basicCache[city]) {
    return Promise.resolve(basicCache[city]);
  }
  const response = await request(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPEN_WHEATHER_KEY}`
  );

  basicCache[city] = response.weather.map(({ id, description }) => ({
    weather: description,
    id
  }));

  return basicCache[city];
};
