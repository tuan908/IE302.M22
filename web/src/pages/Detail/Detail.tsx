import { FC, useState, useEffect } from 'react';
import { RouterProps, useLocation, useParams } from 'react-router-dom';

import {
  DetailWrapper,
  ImageContainer,
  ImageDetail,
} from './DetailStyledComponents';

interface DetailScreenProps {
  history?: History;
}

const Detail: FC<DetailScreenProps> = ({ history }: DetailScreenProps) => {
  const routeParams = useParams();
  const { isVideo, url, user, downloads, tags, postId, likes, views } =
    routeParams;
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [like, setLike] = useState<number>(parseInt(likes!));

  useEffect(() => {
    const payload = {
      postId,
      views,
      like,
    };

    return () => {
      second;
    };
  }, [third]);

  return (
    <div style={{ height: '100%' }}>
      <DetailWrapper>
        <GoBack onClick={history?.back}>
          <ArrowBackIcon />
        </GoBack>
        <ImageContainer>
          {isVideo !== 'true' ? (
            <ImageDetail>
              <img src={routeParams.url} alt="" />
            </ImageDetail>
          ) : (
            <ImageDetail>
              <video alt="name" src={url} controls>
                <source
                  src="https://drive.google.com/uc?id=1dE_dbgxeP_EMJOqLYu5Mq3NxGrQu1z2X"
                  type="video/mp4"
                />
              </video>
            </ImageDetail>
          )}

          <ImageInformation>
            <h1>Upload by: {user}</h1>
            <h4>
              <VisibilityIcon style={{ fill: '#111', marginRight: '10px' }} />
              {views}
            </h4>

            <h4>
              <GetAppIcon style={{ fill: '#111', marginRight: '10px' }} />
              {downloads}
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
                <h4>{countLike}</h4>
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
                <h4>{countLike}</h4>
              </h4>
            )}

            <h4>
              <LocalOfferIcon
                style={{ fill: '#e3780c', marginRight: '10px' }}
              />
              {tags}
            </h4>
          </ImageInformation>
        </ImageContainer>

        <Comment postId={postId} />
        <ScrollToTop />
      </DetailWrapper>
    </div>
  );
};

export default Detail;
