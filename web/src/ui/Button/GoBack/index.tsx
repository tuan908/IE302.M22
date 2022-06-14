import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import device from 'src/util/style/device';
import styled from 'styled-components';

const GoBack = styled.button`
  width: 60px;
  max-width: 265px;
  top: 100px;
  position: fixed;
  left: 40px;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;

  @media ${device.mobileS} {
  }

  @media ${device.mobileM} {
  }

  @media ${device.mobileL} {
    z-index: 101;
    width: 60px;
    max-width: 265px;
    top: 20%;
    position: fixed;
    left: 5%;
    outline: none;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  @media ${device.tablet} {
  }

  @media ${device.laptop} {
  }

  @media ${device.laptopL} {
  }

  @media ${device.desktop} {
  }
`;

export default function GoBackButton() {
  const navigate = useNavigate();
  return (
    <GoBack onClick={() => navigate(-1)} type="button" title="Go back">
      <ArrowBack color="error" />
    </GoBack>
  );
}
