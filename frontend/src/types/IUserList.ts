import { IError } from './IError';

export interface IUserList extends ApiResponse {
  id: number;
  name: string;
  role: RoleEnum;
  role_id: number;
  created_at: Date;
  updated_at: Date;
}

export enum RoleEnum  {
    ADMIN = "Admin",
    USER = "User",
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponse = Record<string, any>;

export interface IUserListState {
  loading: boolean;
  data: IUserList | null;
  readonly errors?: IError;
}

export enum IUserListActionTypes {
  FETCH_REQUEST = '@@userList/FETCH_REQUEST',
  FETCH_SUCCESS = '@@userList/FETCH_SUCCESS',
  FETCH_ERROR = '@@userList/FETCH_ERROR',
}
