import {FC, useEffect} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {LoginForm} from "../components/LoginForm.tsx";
import {useSelector} from "react-redux";

import {selectLoginData} from "../store/selectors/loginSelectors.ts";
import {getItemFromLocalStorage} from "../services/localStorageService.ts";
import {AUTH_STATE} from "../constants.ts";
export const LoginPage: FC = () => {
    const selectedLogin = useSelector(selectLoginData);
    const history = useHistory();

    useEffect(() => {

        if (selectedLogin && selectedLogin.token) {
            // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
            const timeoutId = setTimeout(() => {
                history.push('/todo')
            }, 400);

            // Cleanup function to clear the timeout if the component unmounts
            return () => clearTimeout(timeoutId);
        }
    }, [selectedLogin]);
    return (
        <>
            <section className="p-3 p-md-4 p-xl-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 bsb-tpl-bg-platinum">
                            <div className="d-flex flex-column justify-content-between h-100 p-3 p-md-4 p-xl-5"
                                 style={{backgroundColor: '#ddd'}}>
                                <h3 className="m-0">

                                    {selectedLogin && selectedLogin.token ? (
                                        <> Welcome {selectedLogin.name}!</>
                                    ) : (
                                        <>
                                            Welcome !
                                        </>
                                    )}
                                </h3>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 bsb-tpl-bg-lotion">
                            <div className="p-3 p-md-4 p-xl-5">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-5">
                                            {getItemFromLocalStorage(AUTH_STATE) ? (
                                                <>
                                                    <h2 className="h3">Already Logged</h2>
                                                    <NavLink to={'/todo'}>Go to Todo page</NavLink>
                                                </>
                                            ) : (
                                                <>
                                                    <h2 className="h3">Login</h2>
                                                    <h3 className="fs-6 fw-normal text-secondary m-0">Enter your details
                                                        to
                                                        login</h3>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <LoginForm/>
                                <div className="row">
                                    <div className="col-12">
                                        <hr className="mt-5 mb-4 border-secondary-subtle"/>
                                        <p className="m-0 text-secondary text-end">Need to
                                            <NavLink to={'/register'}
                                                     className={'link-primary text-decoration-none px-1'}>Register</NavLink>?
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};
