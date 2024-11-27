import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { map, mergeMap, filter, catchError } from 'rxjs/operators';
import { isActionOf, ActionType } from 'typesafe-actions';
import {IApplicationState} from "../../index.ts";
import {errorHandler} from "../../../helpers/errorHandler.ts";
import {removeTodoListAction} from "../../actions/todoListActions.ts";
import { delay } from 'rxjs';
import {fetchTodoDelete} from "../../../api/todoDelete.ts";

type RootActions = ActionType<typeof removeTodoListAction>;

export const removeTodoListEpic: Epic<RootActions, RootActions, IApplicationState> = (action$) =>
  action$.pipe(
    filter(isActionOf(removeTodoListAction.request)),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,no-empty-pattern
    mergeMap(({payload}: ReturnType<any>) =>
        fetchTodoDelete(payload.bearerToken, payload.id).pipe(
            delay(1000),
        map(({ data }) => removeTodoListAction.success(data)),
        catchError((error) => {
          errorHandler(error);
          return of(removeTodoListAction.failure(error.response));
        }),
      ),
    ),
  );
