import { PayloadAction, createReducer } from "@reduxjs/toolkit";
import { changeLanguageAction } from "./action";

export enum Language {
    ENG = 'ENG',
    RU = 'RU'
}

export interface LanguageStore {
    lang: Language
}

const defaultMiniStore: LanguageStore = {
    lang: Language.ENG,
}

export const languageReducer = createReducer<LanguageStore>(defaultMiniStore, {
    [changeLanguageAction.type]: (store, action: PayloadAction<Language>) => {
        store.lang = action.payload
    }
})