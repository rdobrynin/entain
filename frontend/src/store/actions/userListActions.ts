import { createAsyncAction } from 'typesafe-actions';
import {IUserList, IUserListActionTypes} from "../../types/IUserList.ts";

export const fetchUserListAction = createAsyncAction(
  IUserListActionTypes.FETCH_REQUEST,
    IUserListActionTypes.FETCH_SUCCESS,
    IUserListActionTypes.FETCH_ERROR,
)<undefined, IUserList, string>();
