import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { authReducer, AuthState } from "./auth/reducer";

export type Identifier = number | string;

export interface AppStorage {
    auth: AuthState
}

export const store = configureStore<AppStorage>({
    reducer: combineReducers({
        auth: authReducer
    })
})