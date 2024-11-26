import { combineEpics } from 'redux-observable';
import { fetchUserListEpic } from './fetchUserListEpic.ts';

export const userListEpic = combineEpics(fetchUserListEpic);
