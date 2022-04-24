import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FC, useState } from 'react';
import ScrollToTop from 'src/component/Button/ScrollTop';
import PinterestContent from 'src/component/Content';
import PinterestPost from 'src/component/Post';
import HomeStyledComponents from './HomeStyledComponent';

interface PinterestHomeProps {
  //   pin: any;
}

const PinterestHome: FC<PinterestHomeProps> = () => {
  const { HomeWrapper, PostBtnWrapper, ScrollTopBtnWrapper } =
    HomeStyledComponents;

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
