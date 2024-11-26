import { IApplicationState } from '../../store';
import { createSelector } from 'reselect';

export const selectTodoList= (state: IApplicationState) => state.todoList;

export const selectTodoListLoading = createSelector(
    selectTodoList,
  (todo) => todo.loading,
);

export const selectTodoListError = createSelector(
    selectTodoList,
  (todo) => todo.errors,
);

export const selectTodoListData = createSelector(
    selectTodoList,
  (todo) => todo.data,
);
