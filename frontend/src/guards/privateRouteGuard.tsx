import { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {getItemFromLocalStorage} from "../services/localStorageService.ts";
import {AUTH_STATE} from "../constants.ts";

const PrivateRouteGuard: FC<{
  component: FC;
  path: string | string[];
  exact: boolean;
}> = (props) => {
  const isUserAuthenticate = getItemFromLocalStorage(AUTH_STATE);

  return isUserAuthenticate ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to='/register' />
  );
};
export default PrivateRouteGuard;
