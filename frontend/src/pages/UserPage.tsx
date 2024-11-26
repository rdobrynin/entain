import {FC} from 'react';
import {Navbar} from "../components/Navbar.tsx";
import {UserList} from "../components/UserList.tsx";

export const UserPage: FC = () => {

    return (
        <div className="container">
            <Navbar/>
            <div className="row">
                <UserList/>
            </div>
        </div>
    )
};
