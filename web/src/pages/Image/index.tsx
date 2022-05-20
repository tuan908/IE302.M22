import {
  ArrowBack,
  Favorite,
  GetApp,
  LocalOffer,
  Visibility,
} from '@mui/icons-material';
import { FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PixabayPhoto } from 'src/api';
import GoBack from '../../component/Button/GoBack';
import ScrollToTop from '../../component/Button/ScrollTop';
import { PinterestFile } from '../Viewer/Dialog/Content';
import {
  DetailWrapper,
  ImageContainer,
  ImageDetail,
  ImageInfo,
} from './Components';

interface IProps {
  file?: PinterestFile;
  visible?: boolean;
}

const PinterestDetail: FC<IProps> = () => {
  const { downloads, likes, tags, user, views, webformatURL } = useLocation()
    .state as PixabayPhoto;
  const navigate = useNavigate();

  // const [isLiked, setIsLiked] = useState<boolean>(false);
  // let [like, setLike] = useState<number>(parseInt(likes!));

  return (
    <DetailWrapper>
      <GoBack onClick={() => navigate(-1)}>
        <ArrowBack />
      </GoBack>
      <ImageContainer>
        {/* {isVideo !== 'true' ? (
          <ImageDetail>
            <img src={webformatURL} alt="" />
          </ImageDetail>
        ) : (
          <ImageDetail>
            <video src={webformatURL} controls>
              <source
                src="https://drive.google.com/uc?id=1dE_dbgxeP_EMJOqLYu5Mq3NxGrQu1z2X"
                type="video/mp4"
              />
            </video>
          </ImageDetail>
        )} */}
        <ImageDetail>
          <img src={webformatURL} alt="" />
        </ImageDetail>

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
          <h4>
            <Favorite style={{ fill: '#e60023', marginRight: '10px' }} />
            {likes}
          </h4>

          {/* {!isLiked ? (
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
          )} */}

          <h4>
            <LocalOffer style={{ fill: '#e3780c', marginRight: '10px' }} />
            {tags}
          </h4>
        </ImageInfo>
      </ImageContainer>

      {/* <Comment postId={postId} /> */}
      <ScrollToTop />
    </DetailWrapper>
  );
};

export default PinterestDetail;
