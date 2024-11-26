import {FC} from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import {getItemFromLocalStorage} from "../services/localStorageService.ts";
import {AUTH_STATE} from "../constants.ts";
export const HomePage: FC = () => {
    const history = useHistory();
    if (getItemFromLocalStorage(AUTH_STATE)) {
        history.push('/todo')
    }
    return (
        <>
            <div className="container-fluid d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
                <div className="row text-center d-flex align-items-center" style={{overflow: 'hidden', width: '50vh', height: '50vh'}}>
                    <div className='d-flex flex-row justify-content-center'>
                        <NavLink to={'/register'} className='px-3'>Register</NavLink>
                        <span>|</span>
                        <NavLink to={'/login'}  className='px-3'>Login</NavLink>
                    </div>
                </div>
            </div>
        </>
    )
};
