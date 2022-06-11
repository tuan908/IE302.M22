import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  GetApp,
  LocalOffer,
  Visibility,
} from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PixabayPhoto } from 'src/api';
import GoBack from '../../ui/Button/GoBack';
import ScrollToTop from '../../ui/Button/ScrollTop';
import {
  DetailWrapper,
  ImageContainer,
  ImageDetail,
  ImageInfo,
} from './Component';

const PinterestDetail = () => {
  const { downloads, likes, tags, user, views, webformatURL } = useLocation()
    .state as PixabayPhoto;
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState<boolean>(false);
  let [like, setLike] = useState<number>(likes);

  return (
    <DetailWrapper>
      <GoBack onClick={() => navigate(-1)}>
        <ArrowBack />
      </GoBack>
      <ImageContainer>
        <ImageDetail>
          <img src={webformatURL} alt="" />
        </ImageDetail>

        <ImageInfo>
          <h1>Upload by: {user}</h1>
          <Typography>
            <Visibility style={{ fill: '#111', marginRight: '10px' }} />
            {views}
          </Typography>

          <Typography>
            <GetApp style={{ fill: '#111', marginRight: '10px' }} />
            {downloads}
          </Typography>
          <Typography>
            <Favorite style={{ fill: '#e60023', marginRight: '10px' }} />
            {likes}
          </Typography>

          {!isLiked ? (
            <Typography>
              <FavoriteBorder
                onClick={() => {
                  setIsLiked(!isLiked);
                  setLike((like += 1));
                }}
                style={{ marginRight: '10px' }}
              />
              {like}
            </Typography>
          ) : (
            <>
              <Favorite
                onClick={() => {
                  setIsLiked(!isLiked);
                  setLike((like -= 1));
                }}
                style={{ fill: '#BE1E2D', marginRight: '10px' }}
              />
              {like.toString}
            </>
          )}

          <Typography>
            <LocalOffer style={{ fill: '#e3780c', marginRight: '10px' }} />
            {tags}
          </Typography>
        </ImageInfo>
      </ImageContainer>

      {/* <Comment postId={postId} /> */}
      <ScrollToTop />
    </DetailWrapper>
  );
};

export default PinterestDetail;
