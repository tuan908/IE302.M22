import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()(() => ({
  root: {
    background: 'linear-gradient(to bottom right, #fff2f2 32%, #ff2424 100%)',
    //opacity: '0.9',
    //color: theme.palette.common.black,
    color: 'black',
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    width: 0,
    zIndex: 100,
    paddingLeft: '10px',
  },
  visible: {
    width: 250,
    display: 'block',
  },
  row: {
    marginTop: '10px',
    //color: '',
    textShadow: '0px 2px 3px #555',
  },
  userName: {
    marginTop: '10px',
    fontWeight: 'bold',
    textShadow: '0px 2px 3px #555',
  },
  rowDate: {
    color: '#3b3b3b',
    fontSize: '12px',
    textShadow: '0px 2px 3px #555',
  },
  rowMdf: {
    marginTop: '10px',
    color: '#3b3b3b',
    fontSize: '12px',
    textShadow: '0px 2px 3px #555',
    marginLeft: '65px',
  },
  title: {
    color: '#ff6666',
    paddingTop: '18px',
    marginBottom: '20px',
    textShadow: '5px 5px 5px #999966',
  },
  button: {
    backgroundColor: '#a80a0a',
    marginTop: '10px',
    padding: '10px',
    color: 'white',
    borderRadius: '8px',
    marginLeft: '145px',
  },

  textBox: {
    height: '90px',
    width: '200px',
    fontSize: '16px',
    overflow: 'hidden',
    resize: 'none',
    background: '#e03434',
    color: 'white',
    borderRadius: '8px',
  },
  icon: {
    marginLeft: '195px',
  },
}));

export default useStyles;
