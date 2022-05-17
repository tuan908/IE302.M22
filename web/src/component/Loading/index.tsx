import { CircularProgress, Grid } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

interface LoadingProps {
  fitContainer?: boolean;
  className?: string;
}

const Loading: FC<LoadingProps> = ({
  fitContainer,
  className,
}: LoadingProps) => {
  const LoadingClassName = clsx(fitContainer, className);
  return (
    <>
      <Grid alignItems="center" className={LoadingClassName}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    </>
  );
};

export default Loading;
