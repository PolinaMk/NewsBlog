import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { logOut, login } from "./actions";
import { TokenObtainPair } from "../../api/authService";
import { ACCESS_KEY, REFRESH_KEY } from "../../constants";

export interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
}

let accsessToken, refreshToken
try {
    accsessToken = localStorage.getItem(ACCESS_KEY);
    refreshToken = localStorage.getItem(REFRESH_KEY);
} catch {

}

const defaultState: AuthState = {
    accessToken: accsessToken ?? null,
    refreshToken: refreshToken ?? null
}

export const authReducer = createReducer(defaultState, {
    [login.fulfilled.type](state, action: PayloadAction<TokenObtainPair>) {
        state.accessToken = action.payload.access
        state.refreshToken = action.payload.refresh

    },
    [logOut.fulfilled.type](state) {
        state.accessToken = null
        state.refreshToken = null

    }
})