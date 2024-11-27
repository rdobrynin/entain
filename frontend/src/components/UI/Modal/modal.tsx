import {
  ReactElement,
  ReactNode,
  TransitionEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { clearAllBodyScrollLocks, disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import {
  Modal as ReactstrapModal,
  ModalBody,
  ModalFooter as ReactstrapModalFooter,
  ModalProps as ReactstrapModalProps,
} from 'reactstrap';

import cx from 'classnames';

import styles from './Modal.module.scss';
import './Modal.styles.scss';

export type ModalComponentsType = {
  Header?: () => ReactElement<Record<string, unknown>>;
  Footer?: () => ReactElement<Record<string, unknown>>;
};

export type ModalProps = {
  children: ReactNode;
  components?: ModalComponentsType;
  modalBodyClassName?: string;
  isHeaderBg?: boolean;
  isFooterBg?: boolean;
} & ReactstrapModalProps;

export const Modal = ({
  children,
  isOpen = false,
  components,
  toggle,
  modalClassName = '',
  wrapClassName = '',
  modalBodyClassName = '',
  isHeaderBg = false,
  isFooterBg = false,
  ...rest
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    modalRef.current && isOpen && disableBodyScroll(modalRef.current);
    modalRef.current && !isOpen && enableBodyScroll(modalRef.current);

    return () => {
      clearAllBodyScrollLocks();
    };
  }, [isOpen]);

  const onOpened = useCallback((event: TransitionEvent<HTMLElement>) => {
    //NOTE: Need to add 'opened' className only after open animation is ended. It fixes case when we have input inside HeadDeployProgressModal, and when we open HeadDeployProgressModal on mobile device, input focus might cause
    //animation flickering. This fix allow us to observe 'opened' className to be added and then focus needed input
    event.propertyName === 'transform' && setIsOpened(true);
  }, []);

  const onClosed = useCallback(() => {
    setIsOpened(false);
  }, []);

  return (
    <ReactstrapModal
      isOpen={isOpen}
      innerRef={modalRef}
      toggle={toggle}
      wrapClassName={cx(wrapClassName, 'react-app')}
      modalClassName={cx(modalClassName, { [styles.open]: isOpen, opened: isOpened })}
      onClosed={onClosed}
      fade={true}
      onTransitionEnd={onOpened}
      {...rest}
    >
      {components?.Header && (
        <div
          className={cx('modal-header', {
            'modal-header__bg rounded': isHeaderBg,
          })}
        >
          <components.Header />
        </div>
      )}

      <ModalBody className={modalBodyClassName}>{children}</ModalBody>

      {components?.Footer && (
        <ReactstrapModalFooter className={cx({ 'modal-footer__bg rounded': isFooterBg })}>
          <components.Footer />
        </ReactstrapModalFooter>
      )}
    </ReactstrapModal>
  );
};
