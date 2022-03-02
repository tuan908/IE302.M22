import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FC, useState } from 'react';
import PinterestContent from 'src/component/Content';
import PinterestPost from 'src/component/Post';
import HomeStyledComponent from './HomeStyledComponent';
import ScrollToTop from 'src/component/Button/ScrollTop';

interface PinterestHomeProps {
  //   pin: any;
}

const PinterestHome: FC<PinterestHomeProps> = () => {
  const { HomeWrapper, PostBtnWrapper, ScrollTopBtnWrapper } =
    HomeStyledComponent;

  const [isOpen, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(!isOpen);
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
