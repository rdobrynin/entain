import { combineEpics } from 'redux-observable';
import { fetchTodoListEpic } from './fetchTodoListEpic.ts';
import {removeTodoListEpic} from "./removeTodoListEpic.ts";

export const todoListEpic = combineEpics(
    fetchTodoListEpic,
    // @ts-ignore
    removeTodoListEpic,
);
