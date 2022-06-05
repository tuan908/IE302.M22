import styled, { CSSProperties } from 'styled-components';

type Style = CSSProperties | undefined;

const avatarStyle: Style = {
  width: '2rem',
  height: '2rem',
  marginRight: '1rem',
};

const isDisplay = (isShow: boolean): Style => ({
  display: isShow ? '' : 'none',
});

const inputStyle = (isShow: boolean): Style => ({
  ...isDisplay(isShow),
  outline: 'none',
  padding: '5px 10px',
  borderRadius: '5rem',
  borderWidth: '.05rem',
  borderColor: '#005bc5',
});

const btnCss = (isShow: boolean): Style => ({
  display: isShow ? '' : 'none',
  border: 'none',
  outline: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  fontSize: '.75rem',
  width: 'fit-content',
  padding: '5px 10px',
});

const ContentWrapper = styled.div``;

export { avatarStyle, inputStyle, isDisplay, btnCss, ContentWrapper };
