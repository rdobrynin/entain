import { createAsyncAction } from 'typesafe-actions';
import {ILogin, ILoginActionTypes} from "../../types/ILogin.ts";

export const fetchLoginAction = createAsyncAction(
  ILoginActionTypes.FETCH_REQUEST,
    ILoginActionTypes.FETCH_SUCCESS,
    ILoginActionTypes.FETCH_ERROR,
)<undefined, ILogin, string>();
