import { Label as ReactStrapLabel, LabelProps } from 'reactstrap';

export const Label = ({ children, ...rest }: LabelProps) => (
  <ReactStrapLabel {...rest}>{children}</ReactStrapLabel>
);
