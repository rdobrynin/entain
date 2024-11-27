import cx from 'classnames';
import { Button as ReactstrapButton, ButtonProps as ReactstrapButtonProps } from 'reactstrap';
import { Spinner } from 'reactstrap';
import styles from '@/components/UI/Button/Button.module.scss';

export enum ButtonSizeEnum {
  SMALL = 'sm',
  MEDIUM = 'md',
  LARGE = 'lg',
  XLARGE = 'xl',
}

export type ButtonProps = {
  size?: 'sm' | 'md' | 'lg' | ButtonSizeEnum;
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'link'
    | 'unstyled'
    | 'light'
    | 'underline'
    | 'transparent'
    | 'close';
  isSquare?: boolean;
  isLoading?: boolean;
  href?: string; // When you add this property component will be changed to link with btn styles
  target?: string;
  rel?: string;
  isBlock?: boolean;
} & Omit<ReactstrapButtonProps, 'size'>;

export const Button = ({
  size = ButtonSizeEnum.SMALL,
  color = 'primary',
  disabled = false,
  className = '',
  isLoading = false,
  isSquare = false,
  isBlock = false,
  children,
  ...rest
}: ButtonProps) => (
  <ReactstrapButton
    size={size}
    color={color}
    block={isBlock}
    style={styles}
    disabled={disabled || isLoading}
    className={cx(className, {
      'btn-close': color === 'close',
      'btn-square': isSquare,
    })}
    {...rest}
  >
    {isLoading ? <Spinner className={styles.loader} size={size} /> : children}
  </ReactstrapButton>
);
