import { Epic } from 'redux-observable';
import { delay, of } from 'rxjs';
import { map, mergeMap, filter, catchError } from 'rxjs/operators';
import { isActionOf, ActionType } from 'typesafe-actions';

import {errorHandler} from "../../../helpers/errorHandler.ts";
import {IApplicationState} from "../../index.ts";
import {setItemToLocalStorage} from "../../../services/localStorageService.ts";
import {AUTH_STATE} from "../../../constants.ts";
import {fetchLogin} from "../../../api/login.ts";
import {fetchLoginAction} from "../../actions/loginActions.ts";

type RootActions = ActionType<typeof fetchLoginAction>;

export const fetchLoginEpic: Epic<RootActions, RootActions, IApplicationState> = (action$) =>
  action$.pipe(
    filter(isActionOf(fetchLoginAction.request)),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mergeMap(({ payload }: ReturnType<any>) =>
        fetchLogin(payload).pipe(
        delay(1000),
        map(({ data }) => {
            setItemToLocalStorage(AUTH_STATE, data);
          return fetchLoginAction.success(data);
        }),
        catchError((error) => {
          errorHandler(error);
          return of(fetchLoginAction.failure('An unknown error occurred.'));
        }),
      ),
    ),
  );
