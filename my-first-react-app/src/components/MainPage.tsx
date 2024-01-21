import ReactElement from '../assets/image/mobileNews.png';
import { Language } from '../redux/language/reducer';
import { AppStorage } from '../redux/store';
import { Weather } from './Weather';
import { useSelector } from 'react-redux';

export const MainPage: React.FC = () => {
    const { lang } = useSelector((store: AppStorage) => store.language)

    return <div className="main-block">
        <section className="promo">
            <div className="promo__wrapper">
                <h1 className="promo__title">
                    {lang === Language.ENG ? 'Your breaking news wherever you are' : 'Свежие новости, где бы вы ни находились'}
                </h1>
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