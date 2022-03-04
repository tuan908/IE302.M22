import { CircularProgress, Grid } from '@mui/material';
import { FC } from 'react';
import clsx from 'clsx';

interface Props {
  fitContainer?: boolean;
  className?: string;
}

const PinterestLoading: FC<Props> = ({ fitContainer, className }: Props) => {
  const PinterestLoadingClassName = clsx(fitContainer, className);
  return (
    <>
      <Grid alignItems="center" className={PinterestLoadingClassName}>
        <Grid item>
          <CircularProgress />
        </Grid>
      </Grid>
    </>
  );
};

export default PinterestLoading;
