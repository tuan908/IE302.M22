import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import GetAppIcon from '@mui/icons-material/GetApp';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PixabayPhoto } from 'src/api';
import GoBack from 'src/component/Button/GoBack';
import ScrollToTop from 'src/component/Button/ScrollTop';
import Comment from 'src/component/Comment';
import fileService from 'src/service/file.service';
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
  const navigate = useNavigate();
  let [countLike, setCountLike] = useState(imageInfo.likes);

  useEffect(() => {
    const payload = {
      postID: imageInfo.id,
      views: imageInfo.views + 1,
      count: countLike,
    };

    fileService
      .updateFileById(payload)
      .then((res) => console.log(res))
      .catch((err) => console.log('ERR: ', err.message));
  }, [countLike]);

  useEffect(() => {
    const payload = {
      postID: imageInfo.id,
      views: imageInfo.views + 1,
    };

    fileService
      .updateFileById(payload)
      .then((res) => console.log(res))
      .catch((err) => console.log('ERR: ', err.message));
  }, []);

  return (
    <div style={{ height: '100%' }}>
      <DetailWrapper>
        <GoBack onClick={() => navigate(-1)}>
          <ArrowBackIcon />
        </GoBack>
        <ImageContainer>
          {
            /* {imageInfo.isVideo !== 'true' ? (*/
            <ImageDetail>
              <img src={imageInfo.webformatURL} alt="" />
            </ImageDetail>
            /*) : ( */
          }
          {/* <ImageDetail>
            <video src={imageInfo.webformatURL} controls>
              <source
                src="https://drive.google.com/uc?id=1dE_dbgxeP_EMJOqLYu5Mq3NxGrQu1z2X"
                type="video/mp4"
              />
            </video>
          </ImageDetail> */}
          {/* )} */}

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

        <Comment postId={imageInfo.id} />
        <ScrollToTop />
      </DetailWrapper>
    </div>
  );
};

export default Detail;
