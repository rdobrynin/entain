import {FC, Key, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getItemFromLocalStorage} from "../services/localStorageService.ts";
import {AUTH_STATE} from "../constants.ts";
import {selectTodoList} from "../store/selectors/todoListSelectors.ts";
import {ITodoList, ITodoListActionTypes} from "../types/ITodoList.ts";
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {ConfirmTodoDeleteModal} from "./modal/ConfirmTodoDeleteModal.tsx";
import {CreateTodoModal} from "./modal/CreateTodoModal.tsx";
export const TodoList: FC = () => {
    const dispatch = useDispatch();
    const authData = getItemFromLocalStorage(AUTH_STATE);
    const baseUrl = import.meta.env.VITE_API_URL;
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<boolean>(false);
    const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
    const [showTodo, setShowTodo] = useState<number | null>();
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

    const complete = async (todo: ITodoList) => {
        try {
            await axios.put(
                `${baseUrl}/todo/${todo.id}`,
                {
                    is_completed: true,
                    text: todo.text,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${authData.token}`,
                    },
                },
            );
        } catch (error) {
            console.error(error);
        }

        dispatch({
            type: ITodoListActionTypes.UPDATE_TODO,
            payload: {
                id: todo.id,
                is_completed: true,
            },
        });
    }

    const remove = (id: number) => {
        setShowDeleteConfirm(true);
        setShowTodo(id);
    }

    const create = () => {
        setShowCreateModal(true);
    }

    const onClose = () => {
        setShowDeleteConfirm(!showDeleteConfirm);
    };

    const onCloseCreateModal = () => {
        setShowCreateModal(!showCreateModal);
    };

    const handleRemove = () => {
        if (authData.token) {
            dispatch({
                type: ITodoListActionTypes.REMOVE_TODO,
                payload: {
                    bearerToken: `${authData.token}`,
                    id: showTodo,
                },
            });
            setShowDeleteConfirm(!showDeleteConfirm);
        }
    }

    return (
        <>
            <div className='my-2'>
                <button type="button" className="btn btn-success btn-sm"
                        onClick={create}><i className="bi bi-building-add"></i>
                </button>
            </div>
            <CreateTodoModal
                showModal={showCreateModal}
                onClose={onCloseCreateModal}
            />
            <ConfirmTodoDeleteModal
                onConfirm={handleRemove}
                showModal={showDeleteConfirm}
                onClose={onClose}
            />
            <table className="table table-sm">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">createdAt</th>
                    <th scope="col">Text</th>
                    <th scope="col" style={{width: '140px'}}>is completed</th>
                    <th scope="col" style={{width: '40px'}}>Remove</th>
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
                                            onClick={() => complete(row)}><i
                                        className="bi bi-file-earmark-check"></i>
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
