import { createSelector } from 'reselect';
import {IApplicationState} from "../index.ts";

export const selectSignup = (state: IApplicationState) => state.signup;

export const selectSignupLoading = createSelector(selectSignup, (data) => data.loading);

export const selectSignupError = createSelector(selectSignup, (data) => data.errors);

export const selectSignupData = createSelector(selectSignup, (data) => data.data);
