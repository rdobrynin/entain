export interface ILogin extends ApiResponse {
  token: string;
  name: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponse = Record<string, any>;

export interface ILoginState {
  readonly loading: boolean;
  data: ILogin| null;
  errors?: string;
}

export enum ILoginActionTypes {
  FETCH_REQUEST = '@@login/FETCH_REQUEST',
  FETCH_SUCCESS = '@@login/FETCH_SUCCESS',
  FETCH_ERROR = '@@login/FETCH_ERROR',
}
