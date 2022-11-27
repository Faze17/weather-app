import React, { useState } from 'react'
import './App.css';
const weatherAPI = {
  key: "0c1be6092c9195c36f719178a91a5218",
  base: "https://api.openweathermap.org/data/2.5/"

}

function App() {
  const [query, setQuery] =useState('');
  const [weather, setWeather] = useState('{}');

  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${weatherAPI.base}weather?q=${query}&units=metric&APPID=${weatherAPI.key}`)
      .then(res => res.json())
      .then(result =>  {
      setWeather(result)
      setQuery('')
      console.log(result)
      })
    }
  }

  const dateBuilder = (d) => {
     let months = ['Janurary', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
     let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

     let day = days[d.getDay()];
     let date = d.getDate();
     let month = months[d.getMonth()];
     let year = d.getFullYear();
   
    return `${day} ${date} ${month} ${year}`   
  }

  function capitaliseWeather(str) {
    const titleCase = str
      .toLowerCase()
      .split(' ')
      .map(word => {return word.charAt(0).toUpperCase() + word.slice(1)})
      .join(' ')

    return titleCase
  }

  

  return (
    <div className="app evening7">
      <main>  
        <div className="search-box"> 
            <input type="text"
              className="search-bar" 
              placeholder="Search..." 
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}/> 
          </div>

          {(typeof weather.main != "undefined") ? (
          <div>
            <div className='location-box'>
                <div className='location'>{weather.name}, {weather.sys.country}</div>
                <div className='date'>{dateBuilder(new Date())}</div>
            </div>
                <div className='weather-box'>
                    <div className='temp'>{Math.round(weather.main.temp)}°C</div>
                    <div className='weather'> {capitaliseWeather(weather.weather[0].description)}</div> 
                </div>
          </div>
          ) : ('')}
      </main>
    </div>
  );
}

export default App;
 