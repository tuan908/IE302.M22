import * as React from 'react';

type Style = React.CSSProperties | undefined;

const imgPreviewCss: Style = {
  border: '1px solid black',
  borderRadius: '20px',
  position: 'relative',
};

const closeInputCss: Style = {
  position: 'absolute',
  color: 'white',
  right: '2rem',
  top: '2rem',
  fontSize: '2rem',
};

const showInputCss: Style = {
  width: '100%',
  height: '100%',
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid black',
  borderRadius: '20px',
};

const showInputTextCss: Style = {
  position: 'absolute',
  textAlign: 'center',
  width: '100%',
};

const formCss: Style = {
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const inputTitleCss: Style = {
  border: 'none',
  height: '40px',
  fontSize: '1.25rem',
  outline: 'none',
  paddingLeft: '10px',
  marginBottom: '1rem',
};

const fileInputCss: Style = {
  cursor: 'pointer',
  width: '100%',
  height: '100%',
  opacity: '0',
};

const inputImgPreviewCss: Style = {
  borderRadius: '20px',
  left: '0',
  objectFit: 'cover',
};

const hrCss: Style = {
  opacity: '0.7',
};

export {
  imgPreviewCss,
  inputTitleCss,
  formCss,
  showInputTextCss,
  showInputCss,
  closeInputCss,
  fileInputCss,
  inputImgPreviewCss,
  hrCss,
};
