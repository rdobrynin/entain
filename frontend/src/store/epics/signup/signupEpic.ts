import { combineEpics } from 'redux-observable';
import {fetchSignupEpic} from "./fetchSignupEpic.ts";

export const signupEpic = combineEpics(fetchSignupEpic);
