import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 80px;
  background-color: white;
  color: black;
  top: 0;
  position: fixed;
  z-index: 997;
  width: 100%;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 20px 0px;
`;

const Wrapper = styled.div`
  width: 80%;
  margin: auto;

  display: flex;
`;

const LogoWrapper = styled.div`
  .MuiSvgIcon-root {
    color: #e60023;
    font-size: 32px;
    cursor: pointer;
    display: flex;
  }
`;

const Button = styled.div`
  display: flex;
  height: 48px;
  min-width: 123px;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  cursor: pointer;
`;

const HomePageButton = styled(Button)`
  background-color: rgb(17, 17, 17);
  margin-right: 5px;

  a {
    text-decoration: none;
    color: white;
    font-weight: 700;
  }

  :hover {
    opacity: 0.8;
  }
`;

const SearchWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  background-color: #efefef;
  height: 3rem;
  width: 90%;
  border-radius: 50px;
  border: none;
  outline: none;
  position: relative;

  input {
    background-color: #efefef;
    border: none;
    outline: none;
    width: 100%;
    margin-left: 5px;
    font-size: 0.75rem;
    padding-left: 3rem;
    border-radius: 50px;
  }

  input:focus {
    outline: none;
    border: none;
    background-color: #efefef;
  }
`;

const IconsWrapper = styled.div``;

export {
  IconsWrapper,
  SearchWrapper,
  HomePageButton,
  Button,
  LogoWrapper,
  Container,
  SearchBarWrapper,
  Wrapper,
};
