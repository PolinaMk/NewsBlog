import { createAction } from "@reduxjs/toolkit";
import { Language } from "./reducer";

export const changeLanguageAction = createAction<Language>('change Language')