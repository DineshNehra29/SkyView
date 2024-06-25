import React, { useState , useEffect} from 'react';
import './App.css';
import axios from 'axios';
import moment from 'moment';

function App() {
    const [search, setSearch] = useState('');
    const [geolocation, setGeolocation] = useState({});
    const [weather, setWeather] = useState({});
    const [unit, setUnit] = useState(0);
    const [icon, setIcon] = useState('');

    const celsius = () => {
       setUnit(0);
    }

    const farenheit = () => {
        setUnit(1);
    }

    //const imgurl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`

    const url1 = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=1&appid=814be36aabbc524b44b6f4052a9d870c`;

    const location = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            axios.get(url1)
                .then((res) => {
                    console.log(res.data);
                    setGeolocation(res.data[0]); 
                    const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${res.data[0].lat}&lon=${res.data[0].lon}&appid=814be36aabbc524b44b6f4052a9d870c&units=metric`;
                    
                    axios.get(url2)
                        .then((weatherRes) => {
                            console.log(weatherRes.data);
                            setWeather(weatherRes.data);
                        

                        const imgurl = `https://openweathermap.org/img/wn/${weatherRes.data.weather[0].icon}@2x.png`
                            setIcon(imgurl);})

                        .catch((weatherError) => {
                            console.error('Error fetching weather data:', weatherError);
                        });
                })
                .catch((locationError) => {
                    console.error('Error fetching geolocation:', locationError);
                });
                setSearch('');
        }
    };

    useEffect(() => {
        axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=delhi&limit=1&appid=814be36aabbc524b44b6f4052a9d870c`)
            .then((res) => {
                console.log(res.data);
                setGeolocation(res.data[0]); 
                const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${res.data[0].lat}&lon=${res.data[0].lon}&appid=814be36aabbc524b44b6f4052a9d870c&units=metric`;
                
                axios.get(url2)
                    .then((weatherRes) => {
                        console.log(weatherRes.data);
                        setWeather(weatherRes.data);
                        const imgurl = `https://openweathermap.org/img/wn/${weatherRes.data.weather[0].icon}@2x.png`
                            setIcon(imgurl); 
                    })
                    .catch((weatherError) => {
                        console.error('Error fetching weather data:', weatherError);
                    });
            })
            .catch((locationError) => {
                console.error('Error fetching geolocation:', locationError);
            });
    }, []); 
    

    return (
        <div className="App">

            <div className="app1">
                <div className="container">
                    <div className="container1">
                        <div className="weather__header">
                            <div className="weather__search">
                                <input
                                    type="text"
                                    placeholder="Search for a city..."
                                    className="weather__searchform"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    onKeyPress={location}></input>
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <div className="weather__units">
                                <span className="weather_unit_celsius" onClick={celsius}>&deg;C</span>
                                <span className="weather_unit_farenheit" onClick={farenheit}>&deg;F</span>
                            </div>
                        </div>
                        <div className="weather__body">
                            <h1 className="weather__city">{geolocation ? geolocation.name : 'Delhi'}</h1>
                            <div className="weather__datetime">
                                <p>{moment().format('dddd MMMM Do , h:mm a')}</p>
                            </div>
                            <div className="weather__forecast">{weather.weather ? weather.weather[0].main : 'no data'}</div>
                            <div className="weather__icon">
                                <img src={icon} alt='https://openweathermap.org/img/wn/10d@2x.png'></img>
                            </div>
                            { unit===0 && (
                            <p className="weather__temperature">{weather.main ? weather.main.temp.toFixed() : 'no data'}&deg;C</p>)}
                            {unit===1 && (<p className="weather__temperature">{weather.main ? (((weather.main.temp)*9/5)+32).toFixed() : 'no data'}&deg;F</p>)}
                            <div className="weather__minmax">
                            { unit===0 && (<>
                            <p>Min: {weather.main ? weather.main.temp_min.toFixed(2) : 'no data'}&deg;C</p>
                            <p>Max: {weather.main ? weather.main.temp_max.toFixed(2) : 'no data'}&deg;C</p> </>)}
                            { unit===1 && (<>
                            <p>Min: {weather.main ? (((weather.main.temp_min)*9/5)+32).toFixed(2) : 'no data'}&deg;F</p>
                            <p>Max: {weather.main ? (((weather.main.temp_max)*9/5)+32).toFixed(2) : 'no data'}&deg;F</p> </>)}
                            </div>
                        </div>

                        <div className="weather__info">
                            <div className="weather__card">
                                <i className="fa-solid fa-temperature-full"></i>
                                <div>
                                    <p>Feels Likee</p>
                                    { unit===0 && (
                            <p className="weather__realfeel">{weather.main ? weather.main.feels_like.toFixed(2) : 'no data'}&deg;C</p>)}
                            {unit===1 && (<p className="weather__realfeel">{weather.main ? (((weather.main.feels_like)*9/5)+32).toFixed(2) : 'no data'}&deg;F</p>)}
                            
                                </div>
                            </div>
                            <div className="weather__card">
                                <i className="fa-solid fa-droplet"></i>
                                <div>
                                    <p>Humidity</p>
                                    <p className="weather__humidity">{weather.main ? weather.main.humidity : 'no data'}%</p>
                                </div>
                            </div>
                            <div className="weather__card">
                                <i className="fa-solid fa-wind"></i>
                                <div>
                                    <p>Wind</p>
                                    <p className="weather__wind">{weather.wind ? weather.wind.speed : 'no data'} m/s</p>
                                </div>
                            </div>
                            <div className="weather__card">
                                <i className="fa-solid fa-gauge-high"></i>
                                <div>
                                    <p>Pressure</p>
                                    <p className="weather__pressure">{weather.main ? weather.main.pressure : 'no data'} hPa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
