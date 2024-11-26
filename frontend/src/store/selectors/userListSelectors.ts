import { IApplicationState } from '../../store';
import { createSelector } from 'reselect';

export const selectUserList= (state: IApplicationState) => state.userList;

export const selectUserListLoading = createSelector(
    selectUserList,
  (data) => data.loading,
);

export const selectUserListError = createSelector(
    selectUserList,
  (data) => data.errors,
);

export const selectUserListData = createSelector(
    selectUserList,
  (data) => data.data,
);
