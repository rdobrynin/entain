import { Modal, ModalComponentsType } from '../UI/Modal/modal';
import { useMemo } from 'react';
import { Button } from '../UI/Button/Button';
import Spinner from 'react-bootstrap/Spinner';
import { CloseIcon } from '../UI/Svg/CloseIcon';

type ConfirmTodoDeleteProps = {
  showModal: boolean;
  onConfirm: () => void;
  onClose: () => void;
};

export const ConfirmTodoDeleteModal = ({
  showModal,
  onConfirm,
  onClose,
}: ConfirmTodoDeleteProps) => {
  // const isLoading = useSelector(selectDeleteHeadsLoading);
  const isLoading = false;

  const modalComponents: ModalComponentsType = useMemo(
    () => ({
      Header: () => (
        <div className='d-flex flex-row  justify-content-between w-100 align-items-center px-3'>
          <h6>You will remove todo</h6>
          <div className='btn-toolbar gap-2 flex-lg-nowrap'>
            <Button color='transparent' onClick={onClose} disabled={isLoading}>
              <CloseIcon width={16} height={16} fill={'#1e1e1e'} />
            </Button>
          </div>
        </div>
      ),
      Footer: () => (
        <div className='d-flex flex-column flex-sm-row justify-content-end w-100'>
          <div className='btn-toolbar gap-2 flex-lg-nowrap'>
            <Button color='light' onClick={onClose}>
              Cancel
            </Button>

            <Button color='danger' onClick={onConfirm} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner animation='border' className='mr-2' size='sm' role='status'></Spinner>
                </>
              ) : (
                <>
                  Remove
                </>
              )}
            </Button>
          </div>
        </div>
      ),
    }),
    [showModal, onConfirm, onClose, isLoading],
  );

  return (
    <Modal isOpen={showModal} components={modalComponents} centered={true}>
      <div className='d-flex flex-column gap-4'>
        <p>
          This modal created via extend UI functional component with reactstrap lib.
        </p>
        <p className='caption'>You can look at frontend/components/UI/Modal</p>
      </div>
    </Modal>
  );
};
