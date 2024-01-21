import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authReducer, AuthState } from "./auth/reducer";
import { LanguageStore, languageReducer } from "./language/reducer";
import logger from 'redux-logger'

export type Identifier = number | string;

export interface AppStorage {
    auth: AuthState,
    language: LanguageStore
}

export const store = configureStore<AppStorage>({
    reducer: combineReducers({
        auth: authReducer,
        language: languageReducer
    }),
    middleware: [...getDefaultMiddleware(), logger] as any
})