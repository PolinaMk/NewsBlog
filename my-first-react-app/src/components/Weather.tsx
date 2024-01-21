import axios from "axios";
import { useEffect, useState } from "react";
import { WeatherInfo } from "./WeatherInfo";

import d01 from "../assets/icons/sunny.svg";
import n01 from "../assets/icons/night.svg";
import d02 from "../assets/icons/day.svg";
import n02 from "../assets/icons/cloudy-night.svg";
import d03 from "../assets/icons/cloudy.svg";
import n03 from "../assets/icons/cloudy.svg";
import d04 from "../assets/icons/perfect-day.svg";
import n04 from "../assets/icons/cloudy-night.svg";
import d09 from "../assets/icons/rain.svg";
import n09 from "../assets/icons/rain-night.svg";
import d10 from "../assets/icons/rain.svg";
import n10 from "../assets/icons/rain-night.svg";
import d11 from "../assets/icons/storm.svg";
import n11 from "../assets/icons/storm.svg";
import d13 from "../assets/icons/snowing-svgrepo-com.svg";

import weatherSvg from "../assets/icons/day.svg"
import { useSelector } from "react-redux";
import { AppStorage } from "../redux/store";
import { Language } from "../redux/language/reducer";

export const WeatherIcons = {
  "01d": d01,
  "01n": n01,
  "02d": d02,
  "02n": n02,
  "03d": d03,
  "03n": n03,
  "04d": d04,
  "04n": n04,
  "09d": d09,
  "09n": n09,
  "10d": d10,
  "10n": n10,
  "11d": d11,
  "11n": n11,
  "13d": d13,
  "13n": d13,
  "50n": d13,
  "50d": d13,
};


export const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState<any>();
    const [errorMessage, setErrorMessage] = useState(false);
    const [error, setError] = useState<Error>();
    const [loading, setLoading] = useState<boolean>(false);
    const { lang } = useSelector((store: AppStorage) => store.language)


    const getWeather = async (e) => {
        setLoading(true)
        try {
            e.preventDefault();
            const response = await axios.get (
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fe4feefa8543e06d4f3c66d92c61b69c`,
            );
            setWeather(response.data);
            setErrorMessage(false)
        } catch (e: unknown) {
            setCity('')
            setErrorMessage(true)
            setError(e as Error)
        } finally {
            setLoading(false)
        }
    };

    const getTime = (timeStamp) => {
        return `${new Date(timeStamp * 1000).getHours()} : ${new Date(timeStamp * 1000).getMinutes()}`
    }

    const isDay = weather?.weather[0].icon?.includes('d')


    return <div className="weather">
        <div className="weather__header">
            <h2 className="weather__title article__title">
                {lang === Language.ENG ? 'Weather' : 'Погода'}
            </h2>
            {loading && <div className="spinner-border text-secondary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
            <div className="weather__img-wrapper">
                <img className="weather__img" src={weatherSvg} alt="" />
            </div>
        </div>
        <h5 className="weather__subtitle">
            {lang === Language.ENG ? 'Find Weather of your city' : 'Посмотрите погоду в твоём городе'}
        </h5>

        <form className="weather__form" onSubmit={getWeather}>
            <input className="article__search-input weather__form-input form-control" onChange={(e) => setCity(e.target.value)} placeholder="City..."/>
            <button className="weather__form-bth" type={"submit"}>
                {lang === Language.ENG ? 'Search' : 'Поиск'}
            </button>
        </form>

        {city && weather && <div className="weather__wrapper promo__wrapper">

            <div className="weather__main-info">
                <span className="weather__temp">
                    <span>{`${Math.floor(weather?.main?.temp - 273)}°C`}</span>
                    {`  |  ${weather?.weather[0].description}`}
                </span>
                <div className="weather__img-wrapper weather__img-wrapper__city">
                    <img className="weather__img" src={WeatherIcons[weather?.weather[0].icon]} alt=""/>
                </div>
            </div>

            <p className="weather__city-name">{`${weather?.name}, ${weather?.sys?.country}`}</p>

            <p className="weather__addition-info">
                {lang === Language.ENG ? 'Weather Info' : 'Информация о погоде'}
            </p>

            <div className="weather__addition-info_wrapper">
                <WeatherInfo name={isDay ? "sunset" : "sunrise"}
                                      value={`${getTime(weather?.sys[isDay ? "sunset" : "sunrise"])}`}/>
                <WeatherInfo name={"humidity"} value={weather?.main?.humidity}/>
                <WeatherInfo name={"wind"} value={weather?.wind?.speed}/>
                <WeatherInfo name={"pressure"} value={weather?.main?.pressure}/>
            </div>
        </div>}

        {errorMessage && <div>
            <p className="weather__addition-info weather__no-result">
                {lang === Language.ENG ? 'Sorry, we did not find this town' : 'Извините, мы не нашли этот город'}
            </p>
        </div>}

    </div>
}