import { Reducer } from 'redux';

import { IError } from '../../types/IError';
import {ITodoList, ITodoListActionTypes, ITodoListState} from "../../types/ITodoList.ts";

export const initialState: ITodoListState = {
  data: null,
  errors: undefined,
  loading: true,
};

const todoListReducer: Reducer<ITodoListState> = (state = initialState, action) => {
  switch (action.type) {
    case ITodoListActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true };
    }
    case ITodoListActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload as ITodoList };
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
