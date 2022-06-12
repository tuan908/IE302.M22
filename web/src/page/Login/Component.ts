import { styled, TextField } from '@mui/material';

export const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== 'focusColor',
})((p) => ({
  // input label when focused
  '& label.Mui-focused': {
    color: '#0000ff',
  },
  // focused color for input with variant='standard'
  '& .MuiInput-underline:after': {
    borderBottomColor: '#0000ff',
  },
  // focused color for input with variant='filled'
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: '#0000ff',
  },
  // focused color for input with variant='outlined'
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: '#0000ff',
    },
  },
}));
