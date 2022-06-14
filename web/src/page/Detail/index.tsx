import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GetAppIcon from '@mui/icons-material/GetApp';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PixabayPhoto } from 'src/api';
import GoBackButton from 'src/ui/Button/GoBack';
import ScrollToTop from 'src/ui/Button/ScrollTop';
import Comment from 'src/ui/Comment';
import {
  DetailWrapper,
  ImageContainer,
  ImageDetail,
  ImageInformation,
} from './Component';

interface ImageInfoProps extends PixabayPhoto {}

const Detail = () => {
  let [isLike, setIsLike] = useState(false);
  const imageInfo = useLocation().state as ImageInfoProps;
  let [countLike, setCountLike] = useState(imageInfo.likes);

  return (
    <div style={{ height: '100%' }}>
      <DetailWrapper>
        <GoBackButton />
        <ImageContainer>
          <ImageDetail>
            <img src={imageInfo.webformatURL} alt="" />
          </ImageDetail>

          <ImageInformation>
            <h1>Upload by: {imageInfo.user}</h1>
            <h4>
              <VisibilityIcon style={{ fill: '#111', marginRight: '10px' }} />
              {imageInfo.views}
            </h4>

            <h4>
              <GetAppIcon style={{ fill: '#111', marginRight: '10px' }} />
              {imageInfo.downloads}
            </h4>
            {!isLike ? (
              <h4>
                <FavoriteBorderIcon
                  onClick={() => {
                    setIsLike(!isLike);
                    setCountLike((countLike += 1));
                  }}
                  style={{ marginRight: '10px' }}
                />
                <p>{countLike}</p>
              </h4>
            ) : (
              <h4>
                <FavoriteIcon
                  onClick={() => {
                    setIsLike(!isLike);
                    setCountLike((countLike -= 1));
                  }}
                  style={{ fill: '#BE1E2D', marginRight: '10px' }}
                />
                <p>{countLike}</p>
              </h4>
            )}

            <h4>
              <LocalOfferIcon
                style={{ fill: '#e3780c', marginRight: '10px' }}
              />
              {imageInfo.tags}
            </h4>
          </ImageInformation>
        </ImageContainer>

        <Comment postId={imageInfo.id} imageUrl={imageInfo.webformatURL} />
        <ScrollToTop />
      </DetailWrapper>
    </div>
  );
};
export default Detail;
