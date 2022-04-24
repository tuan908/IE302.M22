import styled from 'styled-components';

const { div } = styled;

const HomeWrapper = div`
  width: 100%;
  height: 100%;

  -webkit-column-count: 5;
  -moz-column-count: 5;
  column-count: 5;

  -webkit-column-gap: 15px;
  -moz-column-gap: 15px;
  column-gap: 15px;
`;

const PostBtnWrapper = div`
  position: -webkit-sticky;
  position: fixed;
  bottom: 11%;
  right: 2%;
  z-index: 999;
  background-color: white;
  border-radius: 50%;
`;

const ScrollTopBtnWrapper = div`
  position: -webkit-sticky;
  position: fixed;
  bottom: 2%;
  right: 2%;
  z-index: 999;
  background-color: white;
  border-radius: 50%;
`;

const HomeStyledComponents = {
  HomeWrapper,
  PostBtnWrapper,
  ScrollTopBtnWrapper,
};

export default HomeStyledComponents;
