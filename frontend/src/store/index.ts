import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { ILayoutState } from '../types/ILayout';
import { layoutReducer } from './reducers/layoutReducer.ts';
import { healthCheckReducer } from './reducers/healthCheckReducer.ts';
import { IHealthCheckState } from '../types/IHealthCheck';
import {ISignupState} from "../types/ISignup.ts";
import {signupReducer} from "./reducers/signupReducer.ts";
import {ILoginState} from "../types/ILogin.ts";
import {loginReducer} from "./reducers/loginReducer.ts";
import {ITodoListState} from "../types/ITodoList.ts";
import {todoListReducer} from "./reducers/todoListReducer.ts";

export interface IApplicationState {
  layout: ILayoutState;
  signup: ISignupState;
  login: ILoginState;
  healthCheck: IHealthCheckState;
  todoList: ITodoListState;
  router: RouterState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    layout: layoutReducer, healthCheck: healthCheckReducer, signup: signupReducer, login: loginReducer, todoList: todoListReducer,
    router: connectRouter(history),
  });
