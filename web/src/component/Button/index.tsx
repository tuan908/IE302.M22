import Button, { ButtonProps } from '@mui/material/Button';

interface IButtonMaterialProps extends ButtonProps {
  text?: string;
}

function ButtonMaterial({
  text,
  variant,
  classes,
  ...otherProps
}: IButtonMaterialProps) {
  return <Button {...otherProps}>{text}</Button>;
}

export default ButtonMaterial;
