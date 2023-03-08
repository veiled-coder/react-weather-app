import React, { useState } from "react";
import "../styles/app.css";
import sunny from "../images/sunny.png";
import axios from "axios";

function App() {
  let [usercity, setusercity] = useState(null);
  let [temp, setTemp] = useState(null);
  let [apiCityName, setApiCityName] = useState(null);
  let [humidity, setHumidity] = useState();
  let [wind, setWind] = useState();
  let [weatherDescription, setWeatherDescription] = useState();

  function getOnChangeValue(e) {
    setusercity(e.target.value);
  }
  //on form submit,run getUserCity Function
  function getUserCity(e) {
    e.preventDefault();

    //CALL API
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${usercity}&appid=c57ce4bd372d8c67eb7282dd25e41eae&units=metric`;

    function displayWeatherData(weatherData) {
      console.log(weatherData.data.weather[0].description);
      setTemp(weatherData.data.main.temp);
      setApiCityName(weatherData.data.name);
      setHumidity(weatherData.data.main.humidity);
      setWind(weatherData.data.wind.speed);
      setWeatherDescription(weatherData.data.weather[0].description);
    }
    axios.get(url).then(displayWeatherData);
  }

  return (
    <div className="app-container">
      <h1>React weather app</h1>
      <div className="app">
        <form className="search-section" onSubmit={getUserCity}>
          <input
            type="search"
            onChange={getOnChangeValue}
            className="search-input"
            placeholder="type a city"
          ></input>
          <button type="submit" className="search-btn">
            search
          </button>
        </form>

        <h2 className="cityname" id="city">
          {apiCityName}
        </h2>
        {/* trying to return loading when the api call is yet to get the data esp name */}
        <p className="last-updated">Last updated: Tuesday 10:00</p>
        <p className="weather-condition">
          it is currently {temp} degree C in {apiCityName}
        </p>
        <p className="current-weather-description">
          Description: {weatherDescription}
        </p>
        <section className="temp-information-container">
          <div className="temp-description-container">
            <div className="weather-icon">
              <img src={sunny} alt="pictorial representation of the weather" />
            </div>
            <div className="temp-container">
              <p className="temp-value">{temp}</p>
              <div className="temp-symbol">
                <span className="temp-symbol_degree">&#8451;</span>|
                <span className="temp-symbol_fahrenheit">&#8457;</span>
              </div>
            </div>
          </div>
          <div className="temp-evaluation-container">
            <p className="temp-evaluation">HUMIDITY:{humidity}%</p>
            <p className="temp-evaluation">WIND:{wind}km/h</p>
          </div>
        </section>
      </div>
      <p className="author">
        {" "}
        coded by veiled-coder and it's{" "}
        <a
          href="https://github.com/veiled-coder/react-weather-app"
          target="_blank"
          rel="noreferrer"
        >
          open sourced
        </a>
      </p>
    </div>
  );
}

export default App;
