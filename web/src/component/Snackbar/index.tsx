import { Alert, Snackbar } from '@mui/material';
import { FC } from 'react';

interface SnackbarProps {
  type: 'error' | 'info' | 'success' | 'warning';
  message?: string;
}

const PinterestSnackbar: FC<SnackbarProps> = ({
  message,
  type,
}: SnackbarProps) => {
  return (
    <Snackbar
      anchorOrigin={{
        horizontal: 'center',
        vertical: 'top',
      }}
      autoHideDuration={2500}
      open={!!message}
    >
      {type && (
        <Alert elevation={5} severity={type} variant="filled">
          {message}
        </Alert>
      )}
    </Snackbar>
  );
};
export default PinterestSnackbar;
