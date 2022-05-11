import Button, { ButtonProps } from '@mui/material/Button';

interface IProps extends ButtonProps {
  text?: string;
}

function ButtonMaterial({ text, variant, classes, ...otherProps }: IProps) {
  return <Button {...otherProps}>{text}</Button>;
}

export default ButtonMaterial;
