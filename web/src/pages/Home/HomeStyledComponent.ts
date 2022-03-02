import styled from 'styled-components';

const { div } = styled;

const HomeWrapper = div`
    width: 100%;
    height: 100%;
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

const HomeStyledComponent = {
  HomeWrapper,
  PostBtnWrapper,
  ScrollTopBtnWrapper,
};

export default HomeStyledComponent;
