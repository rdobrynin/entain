import { Epic } from 'redux-observable';
import { of } from 'rxjs';
import { map, mergeMap, filter, catchError } from 'rxjs/operators';
import { isActionOf, ActionType } from 'typesafe-actions';
import {fetchHealthCheckAction} from "../../actions/healthCheckActions.ts";
import {IApplicationState} from "../../index.ts";
import {fetchHealthCheck} from "../../../api/healthCheck.ts";
import {errorHandler} from "../../../helpers/errorHandler.ts";

type RootActions = ActionType<typeof fetchHealthCheckAction>;

export const fetchHealthCheckEpic: Epic<RootActions, RootActions, IApplicationState> = (action$) =>
  action$.pipe(
    filter(isActionOf(fetchHealthCheckAction.request)),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any,no-empty-pattern
    mergeMap(({}: ReturnType<any>) =>
      fetchHealthCheck().pipe(
        map(({ data }) => fetchHealthCheckAction.success(data)),
        catchError((error) => {
          errorHandler(error);
          return of(fetchHealthCheckAction.failure(error.response));
        }),
      ),
    ),
  );
