import { createAsyncAction } from 'typesafe-actions';
import { ISignup, ISignupActionTypes } from '../../types/ISignup';

export const fetchSignupAction = createAsyncAction(
  ISignupActionTypes.FETCH_REQUEST,
  ISignupActionTypes.FETCH_SUCCESS,
  ISignupActionTypes.FETCH_ERROR,
)<undefined, ISignup, string>();
