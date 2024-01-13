import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { App } from './App';
import fetchIntercept from 'fetch-intercept'
import { ACCESS_KEY, REFRESH_KEY, baseUrl } from './constants';
import { getBasicHeaders } from './api/utils';

function redirectToLogin() {
    window.location.href = `/login?redirect=${encodeURIComponent(window.location.href.replace(window.location.origin, ""))}`
}

fetchIntercept.register({
    request: function (url, config) {
        if (typeof url === 'object' && url !== null) {
            return [url]
        }
        const accessToken = localStorage.getItem(ACCESS_KEY)
        if (accessToken) {
            const headers = config.headers || new Headers()
            headers.set("Authorization", `Bearer ${accessToken}`)
            config.headers = headers
        }

        return [url, config];
    },

    response: async function (response) {
        if (response.status === 401) {
            if (response.url !== window.location.origin + "/auth/jwt/refresh") {
                redirectToLogin()
                return response
            }
            const refreshToken = localStorage.getItem(REFRESH_KEY)
            if (!refreshToken) {
                redirectToLogin()
            }
            const tokenPair = await fetch(`${baseUrl}/auth/jwt/refresh/`, {
                method: "POST",
                body: JSON.stringify({
                    refresh: refreshToken
                }),
                headers: getBasicHeaders()
            }).then(resp => resp.json())
            localStorage.setItem(ACCESS_KEY, tokenPair.access)
            fetch(response.request)
            return fetch(response.request.url, {
                method: response.request.method,
                body: response.request.body,
                headers: response.request.headers
            })
        }
        return response;
    },

} as any);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(<App />);
