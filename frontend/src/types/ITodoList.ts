import { IError } from './IError';

export interface ITodoList extends ApiResponse {
  id: number;
  text: string;
  is_completed: boolean;
  created_at: Date;
  updated_at: Date;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponse = Record<string, any>;

export interface ITodoListState {
  loading: boolean;
  data: ITodoList | null;
  readonly errors?: IError;
}

export enum ITodoListActionTypes {
  FETCH_REQUEST = '@@todoList/FETCH_REQUEST',
  FETCH_SUCCESS = '@@todoList/FETCH_SUCCESS',
  FETCH_ERROR = '@@todoList/FETCH_ERROR',
}
