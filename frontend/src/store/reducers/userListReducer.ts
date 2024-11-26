import { Reducer } from 'redux';

import { IError } from '../../types/IError';
import {ITodoList, ITodoListActionTypes, ITodoListState} from "../../types/ITodoList.ts";
import {IUserListActionTypes, IUserListState} from "../../types/IUserList.ts";

export const initialState: IUserListState = {
  data: null,
  errors: undefined,
  loading: true,
};

const userListReducer: Reducer<IUserListState> = (state = initialState, action) => {
  switch (action.type) {
    case IUserListActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true };
    }
    case IUserListActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload as ITodoList };
    }
    case IUserListActionTypes.FETCH_ERROR: {
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

export { userListReducer };
