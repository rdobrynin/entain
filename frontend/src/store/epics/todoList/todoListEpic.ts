import { combineEpics } from 'redux-observable';
import { fetchTodoListEpic } from './fetchTodoListEpic.ts';

export const todoListEpic = combineEpics(fetchTodoListEpic);
