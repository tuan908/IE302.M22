import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(({ palette, spacing }) => ({
  containerWithDetailer: {
    paddingRight: 250,
  },

  fileName: {
    color: palette.common.white,
  },

  fullScreenViewerContainer: {
    '& > *:first-child': {
      height: '100vh !important',
      width: '100vw !important',
    },

    background: 'none !important',
    boxShadow: 'none !important',
    transform: 'translateY(0px) !important',
  },

  ghostContainer: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    overflow: 'auto',
    width: '100vw',
  },

  icon: {
    color: palette.common.white,
  },

  loadingWrapper: {
    height: '100%',
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    width: '100%',
  },

  nameItem: {
    flexGrow: 1,
  },

  paper: {
    background: palette.common.black,
    margin: '130px',
    maxWidth: 'initial',
    overflow: 'hidden',
    transform: `translateY(${spacing(3)}px)`,
  },

  toolbar: {
    background:
      'linear-gradient(180deg, rgba(0, 0, 0, .5) 20%, rgba(0, 0, 0, 0))',
    left: 0,
    padding: spacing(1),
    position: 'absolute',
    top: 0,
    zIndex: 1, // Above viewer content
  },

  toolbarWithDetails: {
    width: `calc(100% - 250px)`,
  },
}));

export default useStyles;
