import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../api/authService";
import { ACCESS_KEY, REFRESH_KEY } from "../../constants";

export interface Creds {
    email: string;
    password: string;
}

export const login = createAsyncThunk('login', async (creds: Creds) => {
    const tokenPair = await authService.login(creds)
    localStorage.setItem(ACCESS_KEY, tokenPair.access);
    localStorage.setItem(REFRESH_KEY, tokenPair.refresh);
    return tokenPair;
})

export const logOut = createAsyncThunk('logout', async () => {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
})