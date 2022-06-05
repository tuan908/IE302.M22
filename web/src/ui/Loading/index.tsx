import { CircularProgress, Grid } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

interface Props {
  fitContainer?: boolean;
  className?: string;
}

const Loading: FC<Props> = ({ fitContainer, className }: Props) => {
  const loadingClassName = clsx(fitContainer, className);
  return (
    <>
      <Grid alignItems="center" className={loadingClassName}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    </>
  );
};

export default Loading;
