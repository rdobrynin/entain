import { Epic } from 'redux-observable';
import { delay, of } from 'rxjs';
import { map, mergeMap, filter, catchError } from 'rxjs/operators';
import { isActionOf, ActionType } from 'typesafe-actions';

import {errorHandler} from "../../../helpers/errorHandler.ts";
import {IApplicationState} from "../../index.ts";
import {fetchSignup} from "../../../api/signup.ts";
import {fetchSignupAction} from "../../actions/signupActions.ts";
import {setItemToLocalStorage} from "../../../services/localStorageService.ts";
import {AUTH_STATE} from "../../../constants.ts";

type RootActions = ActionType<typeof fetchSignupAction>;

export const fetchSignupEpic: Epic<RootActions, RootActions, IApplicationState> = (action$) =>
  action$.pipe(
    filter(isActionOf(fetchSignupAction.request)),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mergeMap(({ payload }: ReturnType<any>) =>
        fetchSignup(payload).pipe(
        delay(1000),
        map(({ data }) => {
            setItemToLocalStorage(AUTH_STATE, data);
          return fetchSignupAction.success(data);
        }),
        catchError((error) => {
          errorHandler(error);
          return of(fetchSignupAction.failure('An unknown error occurred.'));
        }),
      ),
    ),
  );
