import { BehaviorSubject } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { combineEpics, Epic } from 'redux-observable';
import {signupEpic} from "./signup/signupEpic.ts";
import {loginEpic} from "./login/loginEpic.ts";
import {todoListEpic} from "./todoList/todoListEpic.ts";
import {userListEpic} from "./userList/userListEpic.ts";

const baseEpics = new BehaviorSubject(
  combineEpics(
      signupEpic,
      // @ts-ignore
      loginEpic,
      todoListEpic,
      userListEpic,
  ),
);

export const epics = (...args: Parameters<Epic>) =>
  baseEpics.pipe(mergeMap((epic: Epic) => epic(...args)));
