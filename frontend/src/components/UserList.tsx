import {FC, Key, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getItemFromLocalStorage} from "../services/localStorageService.ts";
import {AUTH_STATE} from "../constants.ts";
import {ITodoList} from "../types/ITodoList.ts";
import 'bootstrap-icons/font/bootstrap-icons.css';
import {selectUserList} from "../store/selectors/userListSelectors.ts";
import {IUserListActionTypes} from "../types/IUserList.ts";
export const UserList: FC = () => {
    const dispatch = useDispatch();
    const authData = getItemFromLocalStorage(AUTH_STATE);
    const selectedUserist = useSelector(selectUserList);
    useEffect(() => {
        if (authData.token) {
            dispatch({
                type: IUserListActionTypes.FETCH_REQUEST,
                payload: {
                    bearerToken: `${authData.token}`,
                },
            });
        }

    }, []);

    return (
        <>
            <table className="table table-sm">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">createdAt</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                </tr>
                </thead>
                <tbody>
                {selectedUserist?.data ? (
                    selectedUserist?.data.map((row: ITodoList, index: Key | null | undefined) => (
                        <tr key={index}>
                            <td>{row.id}</td>
                            <td>{row.created_at.toString()}</td>
                            <td>{row.name}</td>
                            <td>{row.email}</td>
                            <td>{row.role}</td>
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
