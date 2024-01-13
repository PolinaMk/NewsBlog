import { ACCESS_KEY } from "../constants";

export function getAccessHeaders() {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    const accessToken = localStorage.getItem(ACCESS_KEY)
    if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`)
    }

    return headers
}

export function getBasicHeaders() {
    const headers = new Headers();
    headers.set("Content-Type", "application/json");

    return headers
}