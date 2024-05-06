import React, { useState } from 'react';
import "./weather.css";
import search_icon from '../src/Component/Assets/search.png';
import cloud_icon from '../src/Component/Assets/cloud.png';
import sun_icon from '../src/Component/Assets/sun.webp';
import rain_icon from '../src/Component/Assets/rain.gif'; // Import rain icon

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const api_key = "277d8b63f3d86d73003b5c4ac6074b19";

    const fetchData = async (city) => {
        if (!city) return; // Check if city is provided
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${api_key}`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setWeatherData(data);
            if (!data.name) {
                alert("Location not found");
            }
        } catch (error) {
            alert('Location Not Found');
        }
    };

    const search = () => {
        const element = document.getElementsByClassName("inpcity");
        if (element[0].value === "") {
            return;
        }
        fetchData(element[0].value);
    };

    const renderWeatherIcon = () => {
        if (!weatherData || !weatherData.weather || weatherData.weather.length === 0) {
            return <img src={cloud_icon} alt="Cloudy" className='iconimg' />;
        }

        const weatherCode = weatherData.weather[0].id;
        if (weatherCode >= 200 && weatherCode < 300) {
            return <img src={rain_icon} alt="Rain" className='iconimg' />;
        } else if (weatherCode >= 300 && weatherCode < 600) {
            return <img src={cloud_icon} alt="Cloudy" className='iconimg' />;
        } else if (weatherCode >= 800 && weatherCode < 900) {
            return <img src={sun_icon} alt="Sunny" className='iconimg' />;
        } else {
            return <img src={cloud_icon} alt="Normal" className='iconimg' />;
        }
    };

    const formatDate = (unixTimestamp) => {
        const date = new Date(unixTimestamp * 1000);
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true, // Enable 12-hour format
            timeZone: 'Asia/Kolkata', // Indian Standard Time (IST)
        };
        return date.toLocaleDateString('en-IN', options);
    };

    return (
        <div className='page'>
            <center>
                <div className='main'>
                    <h1>Weather Info</h1>
                    <div className='form'>
                        <input type="text" placeholder="Enter City name" className='inpcity' />
                        <img src={search_icon} alt="Search" onClick={search} className='search' />
                    </div>
                    <div className='search_icons'>
                        {renderWeatherIcon()}
                    </div>

                    <div className='info'>
                        <div className='temp'>
                            <p>
                                {weatherData ? Math.round(weatherData.main.temp) : '0'}
                                <sup>o</sup>
                                <span style={{ fontSize: '20px' }}>Celsius</span>.
                            </p>
                        </div>

                        <div className='location'>{weatherData ? weatherData.name : 'Location'}</div>

                        <div className='date-time'>
                            <span style={{ color: 'gray', fontSize: '17px', margin: '10px' }}>Date & Time (IST)</span><br />
                            <span style={{ fontWeight: 'bold', color: 'black' }}>
                                {weatherData ? formatDate(weatherData.dt) : 'Unknown'}
                            </span>
                        </div>

                        <div className='humidity-wind'>
                            <div className='humidity'>
                                <span style={{ color: 'gray', fontSize: '17px' }}>Humidity</span><br />
                                <span style={{ fontWeight: 'bold', color: 'black' }}>{weatherData ? weatherData.main.humidity : '0'}%</span>
                            </div>
                            <div className='wind'>
                                <span style={{ color: 'gray', fontSize: '17px' }}>Wind speed</span><br />
                                <span style={{ fontWeight: 'bold', color: 'black' }}>
                                    {weatherData ? Math.floor(weatherData.wind.speed) : '0'}
                                    <span style={{ fontSize: '15px', textDecoration: 'none' }}> km/h</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </center>
        </div>
    );
};

export default Weather;
