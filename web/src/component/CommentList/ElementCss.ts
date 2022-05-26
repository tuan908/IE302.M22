import { CSSProperties } from 'styled-components';

type Style = CSSProperties | undefined;

const avatarStyle: Style = {
  marginRight: '1rem',
};

const avatarSx: Style = {
  width: '2rem',
  height: '2rem',
};

function isDisplay(isShow: boolean): Style {
  return {
    display: isShow ? '' : 'none',
  };
}
function inputStyle(isShow: boolean): Style {
  return {
    ...isDisplay(isShow),
    border: 'none',
    outline: 'none',
    padding: '5px 10px',
  };
}

export { avatarStyle, avatarSx, inputStyle, isDisplay };
