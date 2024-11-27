import { createAsyncAction } from 'typesafe-actions';
import {ITodoList, ITodoListActionTypes} from "../../types/ITodoList.ts";

export const fetchTodoListAction = createAsyncAction(
    ITodoListActionTypes.FETCH_REQUEST,
    ITodoListActionTypes.FETCH_SUCCESS,
    ITodoListActionTypes.FETCH_ERROR,
)<undefined, ITodoList, string>();

export const removeTodoListAction = createAsyncAction(
    ITodoListActionTypes.REMOVE_TODO,
    ITodoListActionTypes.FETCH_SUCCESS,
    ITodoListActionTypes.FETCH_ERROR,
)<undefined, ITodoList, string>();
