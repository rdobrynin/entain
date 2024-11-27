import { Reducer } from 'redux';

import { IError } from '../../types/IError';
import {ITodoList, ITodoListActionTypes, ITodoListState} from "../../types/ITodoList.ts";

export const initialState: ITodoListState = {
  data: null,
  errors: undefined,
  loading: true,
};

// @ts-ignore
const todoListReducer: Reducer<ITodoListState> = (state = initialState, action) => {
  switch (action.type) {
    case ITodoListActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true };
    }
    case ITodoListActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload as ITodoList };
    }
    case ITodoListActionTypes.REMOVE_TODO: {
          const data: ITodoList = state.data!.filter(
              (todo: ITodoList) => todo.id !== action.payload.id,
          );
          state.data!.data = data;
          return {
              ...state,
              loading: false,
              data,
          };
    }
      case ITodoListActionTypes.UPDATE_TODO: {
          const todo: ITodoList = state.data!.find(
              (todo: ITodoList) => todo.id === action.payload.id,
          );
          todo.is_completed = action.payload.is_completed;
          state.data!.data = todo;
          return {
              ...state,
              loading: false,
              todo,
          };
      }

      case ITodoListActionTypes.CREATE_TODO: {
          const data = state.data!.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
          const lastItem = state.data![state.data!.length - 1];
          const date = new Date();
          const todo: ITodoList = {
              id: lastItem.id  + 1,
              text: action.payload.text,
              is_completed: false,
              created_at: date.toLocaleDateString(),
              updated_at: date.toLocaleDateString(),
          }
          state.data = data;
          return {
              ...state,
              loading: false,
              data: [...data, todo],
          };
      }
    case ITodoListActionTypes.FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        errors: action.payload as IError | undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export { todoListReducer };
