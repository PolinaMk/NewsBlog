import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import { ACCESS_KEY, REFRESH_KEY, baseUrl } from './constants';
import axios from 'axios';

// function redirectToLogin() {
//     window.location.href = `/login?redirect=${encodeURIComponent(window.location.href.replace(window.location.origin, ""))}`
// }

// function refreshToken() {
//   return axios.post(`${baseUrl}/auth/jwt/refresh/`, {
//     refresh: localStorage.getItem(REFRESH_KEY),
//   }, {
//       headers: {
//         "Content-Type": "application/json"
//       }
//   }).then(response => response.data);
// }


// // Add a request interceptor
// axios.interceptors.request.use(function (config) {
//     const accessToken = localStorage.getItem(ACCESS_KEY)
//     if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`
//     }
//     return config;
// });


// // Add a response interceptor
// axios.interceptors.response.use(function (response) {
//     return response
// }, async function (error) {
//     if (error.response.status === 401) {
//         if (!error.response.config.url.includes('/auth/jwt/refresh')) {
//             const refreshTokenValue = localStorage.getItem(REFRESH_KEY)
//             if (!refreshTokenValue) {
//                 redirectToLogin()
//             }
//             try {
//                 const newToken = await refreshToken();
//                 localStorage.setItem(ACCESS_KEY, newToken.access);
//                 // Retry the original request
//                 return axios(error.config);
//             } catch (errorResp) {
//                 redirectToLogin()
//                 return Promise.reject(errorResp);
//             }
//         }
//     }
//     return Promise.reject(error);
// });


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(<App />);
