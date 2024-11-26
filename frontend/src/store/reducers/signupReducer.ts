import { Reducer } from 'redux';

import { ISignup, ISignupActionTypes, ISignupState } from '../../types/ISignup';

export const initialState: ISignupState = {
  data: null,
  errors: undefined,
  loading: false,
};

const signupReducer: Reducer<ISignupState> = (state = initialState, action) => {
  switch (action.type) {
    case ISignupActionTypes.FETCH_REQUEST: {
      state.errors = undefined;
      return { ...state, loading: true };
    }
    case ISignupActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload as ISignup };
    }
    case ISignupActionTypes.FETCH_ERROR: {
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

export { signupReducer };
