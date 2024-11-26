export interface ISignup extends ApiResponse {
  token: string;
  name: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponse = Record<string, any>;

export interface ISignupState {
  readonly loading: boolean;
  data: ISignup | null;
  errors?: string;
}

export enum ISignupActionTypes {
  FETCH_REQUEST = '@@signup/FETCH_REQUEST',
  FETCH_SUCCESS = '@@signup/FETCH_SUCCESS',
  FETCH_ERROR = '@@signup/FETCH_ERROR',
}
