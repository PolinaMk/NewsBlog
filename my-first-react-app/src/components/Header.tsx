import { NavLink } from 'react-router-dom';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { AppStorage } from '../redux/store';
import { changeLanguageAction } from '../redux/language/action';
import { Language } from '../redux/language/reducer';


export const Header: React.FC = () => {
    const { darkTheme, toggleTheme } = useContext(ThemeContext)
    const [burgerStatus, setBurgerStatus] = useState(false)
    const { lang } = useSelector((store: AppStorage) => store.language)
    const dispatch = useDispatch()

    const changeLang = () => {
        if (lang === Language.RU) {
            dispatch(changeLanguageAction(Language.ENG))
        } else {
            dispatch(changeLanguageAction(Language.RU))
        }
    }

    const openBurger = () => {
        setBurgerStatus(true)
    }

    const closeBurger = () => {
        setBurgerStatus(false)
    }

    useEffect(() => {
        document.documentElement.setAttribute(
        "data-theme",
        darkTheme === "dark" ? "dark" : "light"
        );
    }, [darkTheme]);

    return <nav className="navbar">
        <div className="container">
                <NavLink className='navbar__logo-wrapper' to='/'>
                    <svg className='navbar__logo' width="167" height="56" viewBox="0 0 167 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 4.66667C0 2.08934 2.08934 0 4.66667 0L160.905 0C163.978 0 166.212 2.91767 165.41 5.88378L152.803 52.5504C152.253 54.586 150.406 56 148.298 56H4.66667C2.08934 56 0 53.9107 0 51.3333V4.66667Z" fill="url(#paint0_linear_2_1712)"/>
                        <path d="M28.3031 24.2555V21.5907H39.7775V24.2555H35.661V35.1665H32.4262V24.2555H28.3031ZM45.1815 29.3597V35.1665H41.94V21.5907H45.0754V26.854H45.1881C45.4179 26.2265 45.7936 25.7359 46.315 25.3824C46.8409 25.0289 47.4839 24.8521 48.244 24.8521C48.9599 24.8521 49.583 25.0112 50.1133 25.3294C50.6436 25.6431 51.0546 26.0873 51.3463 26.6618C51.6424 27.2363 51.7882 27.908 51.7838 28.6769V35.1665H48.5423V29.3133C48.5467 28.7476 48.4053 28.3057 48.118 27.9875C47.8308 27.6693 47.4264 27.5103 46.905 27.5103C46.5647 27.5103 46.2642 27.5854 46.0035 27.7356C45.7472 27.8815 45.5461 28.0914 45.4002 28.3654C45.2588 28.6394 45.1859 28.9708 45.1815 29.3597ZM59.1267 35.3587C58.0617 35.3587 57.1425 35.1488 56.3691 34.729C55.6002 34.3048 55.008 33.7015 54.5926 32.9193C54.1816 32.1327 53.9761 31.1981 53.9761 30.1154C53.9761 29.0636 54.1838 28.1444 54.5992 27.3578C55.0146 26.5668 55.6002 25.9525 56.3558 25.515C57.1115 25.0731 58.002 24.8521 59.0272 24.8521C59.752 24.8521 60.4149 24.9648 61.0159 25.1902C61.6169 25.4156 62.1362 25.7492 62.5737 26.1911C63.0112 26.633 63.3514 27.1788 63.5945 27.8284C63.8375 28.4736 63.9591 29.2138 63.9591 30.0491V30.8578H55.1096V28.9752H60.943C60.9385 28.6305 60.8568 28.3234 60.6977 28.0538C60.5386 27.7842 60.3199 27.5743 60.0415 27.4241C59.7675 27.2694 59.4515 27.1921 59.0935 27.1921C58.7312 27.1921 58.4064 27.2738 58.1191 27.4373C57.8319 27.5964 57.6043 27.8152 57.4363 28.0936C57.2684 28.3676 57.18 28.6791 57.1712 29.0282V30.944C57.1712 31.3594 57.2529 31.724 57.4165 32.0377C57.58 32.3471 57.812 32.5879 58.1125 32.7603C58.413 32.9326 58.7709 33.0188 59.1863 33.0188C59.4736 33.0188 59.7343 32.979 59.9685 32.8995C60.2028 32.8199 60.4038 32.7028 60.5718 32.5481C60.7397 32.3935 60.8656 32.2034 60.9496 31.9781L63.9259 32.0642C63.8022 32.7315 63.5304 33.3127 63.1106 33.8076C62.6952 34.2981 62.1494 34.6804 61.4733 34.9544C60.7971 35.224 60.0149 35.3587 59.1267 35.3587ZM70.745 21.5907H74.8085L78.2555 29.996H78.4145L81.8615 21.5907H85.925V35.1665H82.7299V26.8275H82.6172L79.3558 35.0803H77.3142L74.0528 26.7811H73.9401V35.1665H70.745V21.5907ZM93.2844 35.3587C92.215 35.3587 91.2958 35.14 90.5269 34.7025C89.7623 34.2606 89.1724 33.6463 88.757 32.8597C88.346 32.0686 88.1405 31.1517 88.1405 30.1087C88.1405 29.0614 88.346 28.1444 88.757 27.3578C89.1724 26.5668 89.7623 25.9525 90.5269 25.515C91.2958 25.0731 92.215 24.8521 93.2844 24.8521C94.3539 24.8521 95.2709 25.0731 96.0354 25.515C96.8043 25.9525 97.3943 26.5668 97.8053 27.3578C98.2207 28.1444 98.4284 29.0614 98.4284 30.1087C98.4284 31.1517 98.2207 32.0686 97.8053 32.8597C97.3943 33.6463 96.8043 34.2606 96.0354 34.7025C95.2709 35.14 94.3539 35.3587 93.2844 35.3587ZM93.3043 32.9127C93.6932 32.9127 94.0224 32.7934 94.292 32.5548C94.5616 32.3161 94.7671 31.9847 94.9085 31.5604C95.0543 31.1362 95.1272 30.6457 95.1272 30.0888C95.1272 29.5232 95.0543 29.0282 94.9085 28.604C94.7671 28.1798 94.5616 27.8483 94.292 27.6097C94.0224 27.371 93.6932 27.2517 93.3043 27.2517C92.9022 27.2517 92.5619 27.371 92.2835 27.6097C92.0095 27.8483 91.7996 28.1798 91.6538 28.604C91.5123 29.0282 91.4416 29.5232 91.4416 30.0888C91.4416 30.6457 91.5123 31.1362 91.6538 31.5604C91.7996 31.9847 92.0095 32.3161 92.2835 32.5548C92.5619 32.7934 92.9022 32.9127 93.3043 32.9127ZM105.402 35.3587C104.332 35.3587 103.413 35.14 102.644 34.7025C101.88 34.2606 101.29 33.6463 100.874 32.8597C100.463 32.0686 100.258 31.1517 100.258 30.1087C100.258 29.0614 100.463 28.1444 100.874 27.3578C101.29 26.5668 101.88 25.9525 102.644 25.515C103.413 25.0731 104.332 24.8521 105.402 24.8521C106.471 24.8521 107.388 25.0731 108.153 25.515C108.922 25.9525 109.512 26.5668 109.923 27.3578C110.338 28.1444 110.546 29.0614 110.546 30.1087C110.546 31.1517 110.338 32.0686 109.923 32.8597C109.512 33.6463 108.922 34.2606 108.153 34.7025C107.388 35.14 106.471 35.3587 105.402 35.3587ZM105.422 32.9127C105.811 32.9127 106.14 32.7934 106.409 32.5548C106.679 32.3161 106.884 31.9847 107.026 31.5604C107.172 31.1362 107.245 30.6457 107.245 30.0888C107.245 29.5232 107.172 29.0282 107.026 28.604C106.884 28.1798 106.679 27.8483 106.409 27.6097C106.14 27.371 105.811 27.2517 105.422 27.2517C105.019 27.2517 104.679 27.371 104.401 27.6097C104.127 27.8483 103.917 28.1798 103.771 28.604C103.63 29.0282 103.559 29.5232 103.559 30.0888C103.559 30.6457 103.63 31.1362 103.771 31.5604C103.917 31.9847 104.127 32.3161 104.401 32.5548C104.679 32.7934 105.019 32.9127 105.422 32.9127ZM116.008 29.3597V35.1665H112.766V24.9847H115.849V26.854H115.961C116.187 26.2309 116.571 25.7426 117.115 25.389C117.658 25.0311 118.306 24.8521 119.057 24.8521C119.773 24.8521 120.394 25.0134 120.92 25.336C121.45 25.6542 121.861 26.1005 122.153 26.675C122.449 27.2451 122.594 27.9124 122.59 28.6769V35.1665H119.349V29.3133C119.353 28.7476 119.209 28.3057 118.918 27.9875C118.63 27.6693 118.231 27.5103 117.718 27.5103C117.378 27.5103 117.077 27.5854 116.816 27.7356C116.56 27.8815 116.361 28.0914 116.22 28.3654C116.083 28.6394 116.012 28.9708 116.008 29.3597Z" fill="white"/>
                        <defs>
                        <linearGradient id="paint0_linear_2_1712" x1="-12.9669" y1="-6.64031" x2="32.5425" y2="111.545" gradientUnits="userSpaceOnUse">
                        <stop offset="0.47" stop-color="#2F90FC"/>
                        <stop offset="1" stop-color="#3632FF"/>
                        </linearGradient>
                        </defs>
                    </svg>
                </NavLink>

                <div className='navbar__links'>
                    <NavLink className={({ isActive }) => `navbar__link nav-link ${isActive ? 'active' : ''}`} to='/'>
                        {lang === Language.ENG ? 'Main' : 'Главная'}
                    </NavLink>
                    <NavLink className={({ isActive }) => `navbar__link nav-link ${isActive ? 'active' : ''}`} to='/articles'>
                        {lang === Language.ENG ? 'Articles' : 'Новости'}
                    </NavLink>
                     <NavLink className={({ isActive }) => `navbar__link nav-link ${isActive ? 'active' : ''}`} to='/create_article'>
                        {lang === Language.ENG ? 'Create article' : 'Добавить новость'}
                    </NavLink>
                </div>

                <button onClick={toggleTheme} className='navbar__toggle-btn'>
                    {darkTheme ? (
                        <MoonIcon className='navbar__toggle-icon'/>
                    ) : (
                        < SunIcon className='navbar__toggle-icon'/>
                    )}
                </button>

                <button onClick={changeLang} className='navbar__toggle-btn'>
                    {lang === Language.ENG ? (
                        <p>ENG</p>
                    ) : (
                        <p>RU</p>
                    )}
                </button>

                <svg onClick={openBurger} className='navbar__burger' width="47" height="47" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className='navbar__burger_icon-line' d="M2.91016 5.71417H13.4124" stroke="black" stroke-width="1.00189" stroke-miterlimit="10" stroke-linecap="round"/>
                    <path className='navbar__burger_icon-line' d="M2.91016 8.96527H13.4124" stroke="black" stroke-width="1.00189" stroke-miterlimit="10" stroke-linecap="round"/>
                    <path className='navbar__burger_icon-line' d="M2.91016 12.2155H13.4124" stroke="black" stroke-width="1.00189" stroke-miterlimit="10" stroke-linecap="round"/>
                </svg>

                <div className={`navbar__burger-menu ${burgerStatus ? 'navbar__burger__active' : ''}`}>
                    <svg className='navbar__burger-close' onClick={closeBurger} width="47" height="47" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path className='navbar__burger_icon-line' d="M11.6697 11.7135L4.66821 4.71194" stroke="black" stroke-width="1.00189" stroke-linecap="round" stroke-linejoin="round"/>
                        <path className='navbar__burger_icon-line' d="M11.6697 4.71194L4.66821 11.7135" stroke="black" stroke-width="1.00189" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <div className='navbar__burger-links'>
                        <NavLink className={({ isActive }) => `navbar__link nav-link ${isActive ? 'active' : ''}`} to='/' onClick={closeBurger}>
                           {lang === Language.ENG ? 'Main' : 'Главная'}
                        </NavLink>
                        <NavLink className={({ isActive }) => `navbar__link nav-link ${isActive ? 'active' : ''}`} to='/articles' onClick={closeBurger}>
                            {lang === Language.ENG ? 'Articles' : 'Новость'}
                        </NavLink>
                        <NavLink className={({ isActive }) => `navbar__link nav-link ${isActive ? 'active' : ''}`} to='/create_article' onClick={closeBurger}>
                            {lang === Language.ENG ? 'Create article' : 'Добавить новость'}
                        </NavLink>
                    </div>
                </div>

            </div>
        </nav>
}