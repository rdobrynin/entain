import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { map, mergeMap, filter, catchError } from 'rxjs/operators';
import { isActionOf, ActionType } from 'typesafe-actions';
import {IApplicationState} from "../../index.ts";
import {errorHandler} from "../../../helpers/errorHandler.ts";
import { delay } from 'rxjs';
import {fetchUserListAction} from "../../actions/userListActions.ts";
import {fetchUserList} from "../../../api/getUserList.ts";

type RootActions = ActionType<typeof fetchUserListAction>;

export const fetchUserListEpic: Epic<RootActions, RootActions, IApplicationState> = (action$) =>
  action$.pipe(
    filter(isActionOf(fetchUserListAction.request)),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,no-empty-pattern
    mergeMap(({payload}: ReturnType<any>) =>
        fetchUserList(payload.bearerToken).pipe(
            delay(1000),
        map(({ data }) => fetchUserListAction.success(data)),
        catchError((error) => {
          errorHandler(error);
          return of(fetchUserListAction.failure(error.response));
        }),
      ),
    ),
  );
