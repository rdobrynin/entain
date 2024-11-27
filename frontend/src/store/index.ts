import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { ILayoutState } from '../types/ILayout';
import { layoutReducer } from './reducers/layoutReducer.ts';
import {ISignupState} from "../types/ISignup.ts";
import {signupReducer} from "./reducers/signupReducer.ts";
import {ILoginState} from "../types/ILogin.ts";
import {loginReducer} from "./reducers/loginReducer.ts";
import {ITodoListState} from "../types/ITodoList.ts";
import {todoListReducer} from "./reducers/todoListReducer.ts";
import {IUserListState} from "../types/IUserList.ts";
import {userListReducer} from "./reducers/userListReducer.ts";

export interface IApplicationState {
  layout: ILayoutState;
  signup: ISignupState;
  login: ILoginState;
  todoList: ITodoListState;
  userList: IUserListState;
  router: RouterState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    layout: layoutReducer, signup: signupReducer, login: loginReducer, todoList: todoListReducer, userList: userListReducer,
    router: connectRouter(history),
  });
