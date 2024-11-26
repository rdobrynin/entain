import { FC } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {HomePage} from "./pages/HomePage.tsx";
import {LoginPage} from "./pages/LoginPage.tsx";
import {RegisterPage} from "./pages/RegisterPage.tsx";
import {TodoPage} from "./pages/TodoPage.tsx";
import {UserPage} from "./pages/UserPage.tsx";
import PrivateRouteGuard from "./guards/privateRouteGuard.tsx";

export const Routes: FC = () => {
        return (
            <>
                <BrowserRouter>
                    <>
                        <Switch>
                            <Route exact={true} path='/' component={HomePage} />
                            <Route exact={true} path='/register' component={RegisterPage} />
                            <Route exact={true} path='/login' component={LoginPage} />
                            <PrivateRouteGuard exact={true} path='/todo' component={TodoPage} />
                            <PrivateRouteGuard exact={true} path='/users' component={UserPage} />
                        </Switch>
                    </>
                </BrowserRouter>
            </>
        );
    }
;
