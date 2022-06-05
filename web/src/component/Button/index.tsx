import Button, { ButtonProps } from '@mui/material/Button';

interface AppButtonProps extends ButtonProps {
  text?: string;
}

function AppButton({ text, ...otherProps }: AppButtonProps) {
  return <Button {...otherProps}>{text}</Button>;
}

export default AppButton;
