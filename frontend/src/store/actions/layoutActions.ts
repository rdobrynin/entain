import { action } from 'typesafe-actions';
import {LayoutActionTypes, ThemeColors} from "../../types/ILayout.ts";

export const setTheme = (theme: ThemeColors) => action(LayoutActionTypes.SET_THEME, theme);
