import {
  ArrowBack,
  Favorite,
  FavoriteBorder,
  GetApp,
  LocalOffer,
  Visibility,
} from '@mui/icons-material';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  DetailWrapper,
  ImageContainer,
  ImageDetail,
  ImageInfo,
  HeaderLevel4PStyle,
} from './DetailStyledComponents';

import GoBack from '../../component/Button/GoBack';
import PinterestComment from '../../component/Comment';
import ScrollToTop from '../../component/Button/ScrollTop';
import { PinterestFile } from '../Viewer/Dialog/Content';

interface DetailScreenProps {
  history?: History;
  file?: PinterestFile;
  visible?: boolean;
}

const PinterestDetail: FC<DetailScreenProps> = ({
  history,
}: DetailScreenProps) => {
  const routeParams = useParams();
  const { isVideo, url, user, downloads, tags, postId, likes, views } =
    routeParams;
  const [isLiked, setIsLiked] = useState<boolean>(false);
  let [like, setLike] = useState<number>(parseInt(likes!));

  useEffect(() => {}, []);

  return (
    <DetailWrapper>
      <GoBack onClick={history?.back}>
        <ArrowBack />
      </GoBack>
      <ImageContainer>
        {isVideo !== 'true' ? (
          <ImageDetail>
            {/* <img src={url} alt="" /> */}
            <img
              src="https://azurlane.netojuu.com/w/images/thumb/d/df/KronshtadtSpecial_Exercise.png/1920px-KronshtadtSpecial_Exercise.png"
              alt=""
            />
          </ImageDetail>
        ) : (
          <ImageDetail>
            <video src={url} controls>
              <source
                src="https://drive.google.com/uc?id=1dE_dbgxeP_EMJOqLYu5Mq3NxGrQu1z2X"
                type="video/mp4"
              />
            </video>
          </ImageDetail>
        )}

        <ImageInfo>
          <h1>Upload by: {user}</h1>
          <h4>
            <Visibility style={{ fill: '#111', marginRight: '10px' }} />
            {views}
          </h4>

          <h4>
            <GetApp style={{ fill: '#111', marginRight: '10px' }} />
            {downloads}
          </h4>

          {!isLiked ? (
            <h4>
              <FavoriteBorder
                onClick={() => {
                  setIsLiked(!isLiked);
                  setLike((like += 1));
                }}
                style={{ marginRight: '10px' }}
              />
              {like}
            </h4>
          ) : (
            <h4>
              <Favorite
                onClick={() => {
                  setIsLiked(!isLiked);
                  setLike((like -= 1));
                }}
                style={{ fill: '#BE1E2D', marginRight: '10px' }}
              />
              <HeaderLevel4PStyle>{like.toString()}</HeaderLevel4PStyle>
            </h4>
          )}

          <h4>
            <LocalOffer style={{ fill: '#e3780c', marginRight: '10px' }} />
            {tags}
          </h4>
        </ImageInfo>
      </ImageContainer>

      <PinterestComment postId={postId} />
      <ScrollToTop />
    </DetailWrapper>
  );
};

export default PinterestDetail;
