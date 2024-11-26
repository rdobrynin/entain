import { createSelector } from 'reselect';
import {IApplicationState} from "../index.ts";

export const selectLogin= (state: IApplicationState) => state.login;

export const selectLoginLoading = createSelector(selectLogin, (data) => data.loading);

export const selectLoginError = createSelector(selectLogin, (data) => data.errors);

export const selectLoginData = createSelector(selectLogin, (data) => data.data);
