import { CircularProgress } from '@mui/material';
import { FC } from 'react';

interface Props {}

const PinterestLoading: FC<Props> = (props: Props) => {
  return (
    <>
      <CircularProgress />
    </>
  );
};

export default PinterestLoading;
