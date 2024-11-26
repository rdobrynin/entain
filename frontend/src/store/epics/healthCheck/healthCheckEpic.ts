import { combineEpics } from 'redux-observable';
import { fetchHealthCheckEpic } from './fetchHealthCheckEpic.ts';

export const healthCheckEpic = combineEpics(fetchHealthCheckEpic);
