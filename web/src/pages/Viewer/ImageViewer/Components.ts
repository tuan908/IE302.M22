import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(({ spacing }) => ({
  container: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  image: {
    marginBottom: `-${spacing(0.5)}px`,
    maxHeight: `calc(100vh - ${spacing(15)}px)`,
    maxWidth: `calc(100vw - ${spacing(30)}px)`,
    visibility: 'hidden',
  },
}));

export default useStyles;
