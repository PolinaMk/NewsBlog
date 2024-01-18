import ReactElement from '../assets/image/mobileNews.png';
import { Weather } from './Weather';

export const MainPage: React.FC = () => {
    return <div className="main-block">
        <section className="promo">
            <div className="promo__wrapper">
                <h1 className="promo__title">Your breaking news wherever you are</h1>
                <div className="promo__photo-wrapper">
                    <div className="promo__phone-wrapper">
                        <img src={ReactElement} alt="Phone image" className="promo__phone-image"/>
                    </div>
                    <div className="promo__promo__bg"></div>
                </div>
            </div>
        </section>
        <Weather></Weather>
    </div>
}