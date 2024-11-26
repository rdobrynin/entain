import { Reducer } from 'redux';
import {ILogin, ILoginActionTypes, ILoginState} from "../../types/ILogin.ts";

export const initialState: ILoginState = {
  data: null,
  errors: undefined,
  loading: false,
};

const loginReducer: Reducer<ILoginState> = (state = initialState, action) => {
  switch (action.type) {
    case ILoginActionTypes.FETCH_REQUEST: {
      state.errors = undefined;
      return { ...state, loading: true };
    }
    case ILoginActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload as ILogin };
    }
    case ILoginActionTypes.FETCH_ERROR: {
      return {
        ...state,
        loading: false,
        errors: action.payload as string | undefined,
      };
    }
    default: {
      return state;
    }
  }
};

export { loginReducer };
