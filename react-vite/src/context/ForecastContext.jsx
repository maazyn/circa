import { createContext, useState, useContext } from 'react';

export const ForecastContext = createContext();

export const useForecast = () => useContext(ForecastContext);

export const ForecastProvider = ({ children }) => {
  const [forecastStatus, setForecastStatus] = useState(false); //toggle for weather forecast component
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const forecastToggle = () => {
    setForecastStatus((prev) => !prev);
  };

  return (
    <ForecastContext.Provider value={{ forecastStatus, setForecastStatus, weatherData, setWeatherData, error, setError, forecastToggle }}>
      {children}
    </ForecastContext.Provider>
  );
};
