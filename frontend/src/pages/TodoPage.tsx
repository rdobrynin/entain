import {FC} from 'react';
import {Navbar} from "../components/Navbar.tsx";
import {TodoList} from "../components/TodoList.tsx";

export const TodoPage: FC = () => {

    return (
        <>
            <div className="container">
                <Navbar/>
                <div className="row">
                    <TodoList/>
                </div>
            </div>
        </>
    )
};
