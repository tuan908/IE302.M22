import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  contentTitle: {
    fontWeight: 'bold',
    marginBottom: theme.spacing(0.5),
  },
  embedOption: {
    border: 'solid transparent 2px',
    height: '100%',
    minHeight: 100,
    padding: theme.spacing(1),
    textAlign: 'left',
    transition: 'border-color 0.1s ease-out',
    width: '100%',
  },
  embedOptionActive: {
    borderColor: theme.palette.primary.main,
  },
  embedOptionButton: {
    height: '100%',
    width: '100%',
  },
  embedOptionWrapper: {
    flexBasis: 0,
    flexGrow: 1,
    margin: theme.spacing(1, 0, 2, 0),
  },
  linkButton: {
    '&:hover, &:focus': {
      background: 'transparent',
      textDecoration: 'none',
    },
    float: 'right',
    fontSize: 14,
    minWidth: 0,
    padding: 0,
  },
  linkButtonLabel: {
    fontWeight: 'normal',
    textTransform: 'none',
  },
  textareaWrapper: {
    width: '100%',
    paddingBottom: theme.spacing(1.5),
    paddingTop: theme.spacing(1),
  },
  textFieldRoot: {
    '& > div': {
      padding: theme.spacing(1.5, 2),
    },
    '& textarea': {
      fontSize: 14,
    },
    height: 80,
    width: '100%',
  },
}));

export default useStyles;
