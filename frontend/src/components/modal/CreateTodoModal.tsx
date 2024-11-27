import { Modal, ModalComponentsType } from '../UI/Modal/modal';
import {useMemo} from 'react';
import { Button } from '../UI/Button/Button';
import { CloseIcon } from '../UI/Svg/CloseIcon';
import {ITodoListActionTypes} from "../../types/ITodoList.ts";
import {getItemFromLocalStorage} from "../../services/localStorageService.ts";
import {AUTH_STATE} from "../../constants.ts";
import {useDispatch} from "react-redux";
import axios from "axios";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

type CreateTodoProps = {
  showModal: boolean;
  onClose: () => void;
};

interface IFormCreateTodoInput {
    text: string;
}

export const CreateTodoModal = ({
  showModal,
  onClose,
}: CreateTodoProps) => {
    const authData = getItemFromLocalStorage(AUTH_STATE);
    const dispatch = useDispatch();
    const baseUrl = import.meta.env.VITE_API_URL;
    const isLoading = false;
    const schema = yup.object().shape({
        text: yup.string().required("Text is a required field"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormCreateTodoInput>({ resolver: yupResolver(schema) })

    const onSubmit = async (data: IFormCreateTodoInput) => {
        try {
            await axios.post(
                `${baseUrl}/todo`,
                {
                    text: data.text,
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
            type: ITodoListActionTypes.CREATE_TODO,
            payload: {
                text: data.text,
            },
        });

    }

  const modalComponents: ModalComponentsType = useMemo(
    () => ({
      Header: () => (
        <div className='d-flex flex-row  justify-content-between w-100 align-items-center px-3'>
          <h6>You will create todo</h6>
          <div className='btn-toolbar gap-2 flex-lg-nowrap'>
            <Button color='transparent' onClick={onClose} disabled={isLoading}>
              <CloseIcon width={16} height={16} fill={'#1e1e1e'} />
            </Button>
          </div>
        </div>
      ),
    }),
    [showModal, onClose, isLoading],
  );

    return (
    <Modal isOpen={showModal} components={modalComponents} centered={true}>
      <div className='d-flex flex-column gap-4'>
          <form onSubmit={handleSubmit(onSubmit)}>
              <input type="text"
                     {...register("text")}
                     className="form-control my-4"
                     placeholder="text"/>
              <div>
                  {errors.text && <p>{errors.text.message}</p>}
              </div>
              <Button color='success' type="submit">Create</Button>
          </form>
          <p className='caption'>You can look at frontend/components/UI/Modal</p>
      </div>
        <Button color='light' onClick={onClose}>Close</Button>
    </Modal>
  );
};
