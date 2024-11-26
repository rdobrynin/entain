import {FC, useEffect} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {RegisterForm} from "../components/RegisterForm.tsx";
import {useSelector} from "react-redux";
import {selectSignupData} from "../store/selectors/signupSelectors.ts";
import {getItemFromLocalStorage} from "../services/localStorageService.ts";
import {AUTH_STATE} from "../constants.ts";
export const RegisterPage: FC = () => {
    const selectedSignup = useSelector(selectSignupData);
    const history = useHistory();

    useEffect(() => {

        if (selectedSignup && selectedSignup.token) {
            // Use setTimeout to update the message after 2000 milliseconds (2 seconds)
            const timeoutId = setTimeout(() => {
                history.push('/todo')
            }, 800);

            // Cleanup function to clear the timeout if the component unmounts
            return () => clearTimeout(timeoutId);
        }
    }, [selectedSignup]);
    return (
        <>
            <section className="p-3 p-md-4 p-xl-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 bsb-tpl-bg-platinum">
                            <div className="d-flex flex-column justify-content-between h-100 p-3 p-md-4 p-xl-5"
                                 style={{backgroundColor: '#ddd'}}>
                                <h3 className="m-0">

                                    {selectedSignup && selectedSignup.token ? (
                                       <>  Welcome {selectedSignup.name}!</>
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
                                                    <h2 className="h3">Registration</h2>
                                                    <h3 className="fs-6 fw-normal text-secondary m-0">Enter your details
                                                        to
                                                        register</h3>
                                                </>
                                            )}
                                        </div>
                                        </div>
                                </div>
                                <RegisterForm/>
                                <div className="row">
                                    <div className="col-12">
                                        <hr className="mt-5 mb-4 border-secondary-subtle"/>
                                        <p className="m-0 text-secondary text-end">Already have an account?
                                            <NavLink to={'/login'} className={'link-primary text-decoration-none px-2'}>Sign in</NavLink>
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
