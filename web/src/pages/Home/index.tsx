import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FC, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ScrollToTop from 'src/component/Button/ScrollTop';
import PinterestContent from 'src/component/Content';
import PinterestPost from 'src/component/Post';
import { usePinterestSelector } from 'src/redux/hooks';
import HomeStyledComponents from './HomeStyledComponent';

interface IProps {
  redirectPath?: string;
}

const PinterestHome: FC<IProps> = ({ redirectPath = '/login' }) => {
  const { HomeWrapper, PostBtnWrapper, ScrollTopBtnWrapper } =
    HomeStyledComponents;

  const user = usePinterestSelector((state) => state.userReducer.user);

  const [isOpen, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(!isOpen);

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return (
    <HomeWrapper>
      <PinterestContent />

      <PostBtnWrapper>
        <IconButton onClick={() => setOpen(!isOpen)}>
          <Add fontSize="large" />
        </IconButton>
      </PostBtnWrapper>

      <ScrollTopBtnWrapper>
        <ScrollToTop />
      </ScrollTopBtnWrapper>

      <PinterestPost handleClose={handleClose} isOpen={isOpen} />
    </HomeWrapper>
  );
};

export default PinterestHome;
