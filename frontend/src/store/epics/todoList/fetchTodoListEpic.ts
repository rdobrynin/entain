import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { map, mergeMap, filter, catchError } from 'rxjs/operators';
import { isActionOf, ActionType } from 'typesafe-actions';
import {IApplicationState} from "../../index.ts";
import {errorHandler} from "../../../helpers/errorHandler.ts";
import {fetchTodoListAction} from "../../actions/todoListActions.ts";
import {fetchTodoList} from "../../../api/getTodo.ts";
import { delay } from 'rxjs';

type RootActions = ActionType<typeof fetchTodoListAction>;

export const fetchTodoListEpic: Epic<RootActions, RootActions, IApplicationState> = (action$) =>
  action$.pipe(
    filter(isActionOf(fetchTodoListAction.request)),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,no-empty-pattern
    mergeMap(({payload}: ReturnType<any>) =>
        fetchTodoList(payload.bearerToken).pipe(
            delay(1000),
        map(({ data }) => fetchTodoListAction.success(data)),
        catchError((error) => {
          errorHandler(error);
          return of(fetchTodoListAction.failure(error.response));
        }),
      ),
    ),
  );
