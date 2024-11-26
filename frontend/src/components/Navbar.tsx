import {FC} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {getItemFromLocalStorage} from "../services/localStorageService.ts";
import {AUTH_STATE} from "../constants.ts";

export const Navbar: FC = () => {
    const history = useHistory();
    const authData = getItemFromLocalStorage(AUTH_STATE);
    const logout = () => {
        localStorage.clear();
        history.push('/')
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Test Assigment</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to={'/users'} className={'nav-link'}>Users</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/todo'} className={'nav-link'}>Todo</NavLink>
                            </li>
                        </ul>
                        {authData && (
                            <span className='px-2'>Hi, {authData.name}</span>
                        )}
                        <button className='btn btn-danger btn-sm' onClick={logout}>Logout</button>
                    </div>
                </div>
            </nav>
        </>
    )
};
