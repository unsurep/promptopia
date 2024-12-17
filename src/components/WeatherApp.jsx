"use client";

import React, { useState } from "react";
import Link from "next/link";
import { RiArrowGoBackLine } from "react-icons/ri";
import Image from "next/image";
import { FaTemperatureFull } from "react-icons/fa6";
import { TiWeatherPartlySunny } from "react-icons/ti";

const WeatherApp = () => {
  // state handling
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);

  // Error Handling and API Fetch
  const fetchWeather = async () => {
    setError(null);
    if (!city) {
      setError("Error! Please enter city name.");
      return;
    }

    // trying to fetch the api from the api backend (weather)

    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Error! City not found");
      }

      // receiving weather data from API
      const data = await response.json();

      // set weather
      setWeatherData(data);

      // set current date
      setDate(new Date().toLocaleString());

      // set current Time

      // setTime(new Time().toLocaleString())
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  return (
    <section className="bgWeatherApp text-center w-full">
      {/* Nav */}
      <nav className="flex-between w-full px-[1rem] pt-[1rem]  ">
        {/* Logo Section */}

        {/* Div A */}
        <Link
          href="/"
          className="flex gap-2 items-center"
          data-aos="fade-left"
          data-aos-duration="2000"
        >
          <Image
            src="/images/logo.png"
            width={50}
            height={50}
            alt="Promptopia Logo"
            className="object-contain"
          />
          <p className="logo_text">Promptopia</p>
        </Link>

        {/* Div B */}
        <div className="flex" data-aos="fade-right" data-aos-duration="2000">
          {/* sign up normally */}
          <Link href={"/"}>
            <button
              type="button"
              className="black_btn flex items-center justify-center gap-2 shake"
            >
              <p className="">
              <RiArrowGoBackLine />
              </p>
              <p className="text-[14px]">Back</p>
            </button>
          </Link>
        </div>
      </nav>

     

      <h1 className="pt-10 text-5xl orange_gradient font-extrabold bounce-in-top">
        Real-Time Weather App
      </h1>

       {/* error */}
       {error && <div className="text-white text-base bg-red-800  w-fit flex m-auto mt-3 px-4 py-1">{error}</div>}

      <input
        type="text"
        placeholder="Enter City Name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="px-20 outline-none border rounded-md mt-5 glassmorphism"
      />

      <button onClick={fetchWeather} className="text-white bg-black px-4 py-2 ml-3 rounded-md hover:bg-white hover:text-black shake">Search</button>

      <hr className="mt-6" />

      { weatherData && 
        <div className="mt-5 glassmorphism mx-[3rem] md:h-[47vh] ">

            <div className="">
                <h2 className="text-5xl font-bold">{weatherData.name}</h2>
                {date && <div className="pt-3">Current Date: {date}</div>}

            </div>

            <div className="flex w-full justify-center items-center gap-20 pt-8">
                <div>
                    <p className="flex items-center"><FaTemperatureFull />Temperture: {weatherData.main.temp}<sup>0</sup>C</p>
                    <p className="flex items-center"><TiWeatherPartlySunny />Weather: {weatherData.weather[0].description}</p>
                </div>

                <div>
                    <ul>
                        <li>Humidity</li>
                        <li>Wind Speed</li>
                        <li>Description</li>
                    </ul>
                </div>
            </div>


            
            

            

        </div>
      }



    </section>
  );
};

export default WeatherApp;
