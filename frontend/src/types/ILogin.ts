export interface ILogin extends ApiResponse {
  token: string;
  name: string;
  role_id: number;
  role_name: string;
  permissions: Permissions[],
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ApiResponse = Record<string, any>;
export interface Permissions {
   id: number;
   name: PermissionEnum;
}

export enum PermissionEnum  {
    CREATE_ROLE = "create-role",
    EDIT_ROLE = "edit-role",
    DELETE_ROLE = "delete-role",
    CREATE_USER = "create-user",
    EDIT_USER = "edit-user",
    DELETE_USER = "delete-user",
    VIEW_TODO = "view-todo",
    CREATE_TODO = "create-todo",
    EDIT_TODO = "edit-todo",
    DELETE_TODO = "delete-todo",
}
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
