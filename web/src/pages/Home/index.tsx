import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FC, useState } from 'react';
import ScrollToTop from 'src/component/Button/ScrollTop';
import PinterestContent from 'src/component/Content';
import PinterestPost from 'src/component/Post';
import { checkValidJwtToken } from 'src/service/user.service';
import Components from './Component';

interface Props {
  redirectPath?: string;
}

const PinterestHome: FC<Props> = () => {
  const { Wrapper, CreatePostWrapper, ScrollTopWrapper } = Components;

  const [isOpen, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(!isOpen);

  const token = localStorage.getItem('token');
  const isValidToken = async () => {
    return checkValidJwtToken(token!);
  };

  isValidToken();

  return (
    <Wrapper>
      <PinterestContent />

      <CreatePostWrapper>
        <IconButton onClick={() => setOpen(!isOpen)}>
          <Add fontSize="large" />
        </IconButton>
      </CreatePostWrapper>

      <ScrollTopWrapper>
        <ScrollToTop />
      </ScrollTopWrapper>

      <PinterestPost closePost={handleClose} isPostOpen={isOpen} />
    </Wrapper>
  );
};

export default PinterestHome;
