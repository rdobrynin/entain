import {FC, Key, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getItemFromLocalStorage} from "../services/localStorageService.ts";
import {AUTH_STATE} from "../constants.ts";
import {selectTodoList} from "../store/selectors/todoListSelectors.ts";
import {ITodoList, ITodoListActionTypes} from "../types/ITodoList.ts";
import 'bootstrap-icons/font/bootstrap-icons.css';
export const TodoList: FC = () => {
    const dispatch = useDispatch();
    const authData = getItemFromLocalStorage(AUTH_STATE);
    const selectedTodoList = useSelector(selectTodoList);
    useEffect(() => {
        if (authData.token) {
            dispatch({
                type: ITodoListActionTypes.FETCH_REQUEST,
                payload: {
                    bearerToken: `${authData.token}`,
                },
            });
        }

    }, []);

    const complete = (id: number) => {
        console.log(id);
    }

    const remove = (id: number) => {
        console.log(id);
    }
    return (
        <>
            <table className="table table-sm">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">createdAt</th>
                    <th scope="col">Text</th>
                    <th scope="col" style={{width: '140px'}}>is completed</th>
                    <th scope="col" style={{width: '80px'}}>Action</th>
                </tr>
                </thead>
                <tbody>
                {selectedTodoList?.data ? (
                    selectedTodoList?.data.map((row: ITodoList, index: Key | null | undefined) => (
                        <tr key={index}>
                            <td>{row.id}</td>
                            <td>{row.created_at.toString()}</td>
                            <td>{row.text}</td>
                            <td>{row.is_completed ? (
                                <button type="button" className="btn btn-secondary btn-sm w-100"
                                        disabled={true}><i className="bi bi-file-earmark-check"></i></button>
                            ) : (
                                <>
                                    <button type="button" className="btn btn-primary  w-100"
                                            onClick={() => complete(row.id)}><i className="bi bi-file-earmark-check"></i>
                                    </button>
                                </>
                            )}</td>

                            <td>
                                <button type="button" className="btn btn-danger btn-sm"
                                        onClick={() => remove(row.id)}><i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <>
                    <tr>
                     <td>
                         Loading
                     </td>
                    </tr>
                    </>
                    )}
                </tbody>
            </table>
        </>
    )
};
