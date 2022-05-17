import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  container: {
    height: 480,
    width: 854,
  },
  fullScreen: {
    '& > div': {
      paddingTop: '100vh !important',
    },
    height: '100%',
    width: '100%',
  },
}));

export default useStyles;
