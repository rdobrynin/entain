import { combineEpics } from 'redux-observable';
import {fetchLoginEpic} from "./fetchLoginEpic.ts";

export const loginEpic = combineEpics(fetchLoginEpic);
