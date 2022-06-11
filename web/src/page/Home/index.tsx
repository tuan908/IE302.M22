import { Add } from '@mui/icons-material';
import { CircularProgress, Container, IconButton } from '@mui/material';
import { FC, useEffect, useState, useTransition } from 'react';
import { getStartPhotoList, PixabayPhoto } from 'src/api';
import { checkValidJwtToken } from 'src/service/user.service';
import ScrollToTop from 'src/ui/Button/ScrollTop';
import PinterestContent from 'src/ui/Content';
import PinterestPost from 'src/ui/Post';
import { PinterestUserInfo } from 'src/util/user';
import { CreatePostWrapper, ScrollTopWrapper, Wrapper } from './Component';

interface Props {
  redirectPath?: string;
}

const PinterestHome: FC<Props> = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const handleClose = () => setOpen(!isOpen);
  const [items, setItems] = useState<PixabayPhoto[]>([]);
  const [isPending, startTransition] = useTransition();

  const userInfoStored = localStorage.getItem('user_info')!;
  const { token } = JSON.parse(
    userInfoStored!?.toString()
  ) as PinterestUserInfo;

  useEffect(() => {
    checkValidJwtToken(token);
  }, []);

  const getData = async () => {
    const data = await getStartPhotoList();
    try {
      startTransition(() => setItems(data!));
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Wrapper>
      {isPending ? (
        <Container
          fixed
          sx={{
            display: '-webkit-flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress color="primary" size="6rem" />
        </Container>
      ) : (
        <>
          <PinterestContent items={items} />

          <CreatePostWrapper>
            <IconButton onClick={() => setOpen(!isOpen)}>
              <Add fontSize="large" />
            </IconButton>
          </CreatePostWrapper>

          <ScrollTopWrapper>
            <ScrollToTop />
          </ScrollTopWrapper>

          <PinterestPost closePost={handleClose} isPostOpen={isOpen} />
        </>
      )}
    </Wrapper>
  );
};

export default PinterestHome;
