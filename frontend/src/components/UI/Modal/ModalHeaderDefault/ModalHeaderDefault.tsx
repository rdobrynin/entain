import cx from 'classnames';

import { Button } from '../../Button/Button';
import { Label } from '../../Label/Label';
import { CloseIcon } from '../../Svg/CloseIcon';

type ModalHeaderDefaultProps = {
  title: string;
  label?: string;
  headerClassnames?: string;
  onClose?: () => void;
};

export const ModalHeaderDefault = ({
  title,
  label,
  headerClassnames,
  onClose,
}: ModalHeaderDefaultProps) => (
  <div
    className={cx(
      'd-flex justify-content-between w-100 align-items-center rounded',
      headerClassnames,
    )}
  >
    <h5 className='mb-0'>{title}</h5>
    {onClose && (
      <>
        {label && <Label className='text-blue-700'>{label}</Label>}
        <Button size='md' isSquare={true} onClick={onClose} color='transparent'>
          <CloseIcon width={14} height={14} fill={'#4b4b4b'} />
        </Button>
      </>
    )}
  </div>
);
