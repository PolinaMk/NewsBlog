import sunset from "../assets/icons/temp.svg";
import sunrise from "../assets/icons/temp.svg";
import humidity from "../assets/icons/humidity.svg";
import wind from "../assets/icons/wind.svg";
import pressure from "../assets/icons/pressure.svg";

export const WeatherInfoIcons = {
    sunset: sunset,
    sunrise: sunrise,
    humidity: humidity,
    wind: wind,
    pressure: pressure,
};

export const WeatherInfo = (props) => {
    const {name, value} = props;
    return (
        <div>
            <div className="weather__addition-info_svg-wrapper">
                <img src={WeatherInfoIcons[name]}/>
            </div>
            <span>
                {value}
                <span className="weather__addition-info_text">{name}</span>
            </span>
        </div>
    );
};