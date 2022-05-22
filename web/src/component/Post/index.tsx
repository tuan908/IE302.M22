import { Close, CloseOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import setMessage from 'src/redux/action/message';
import { loadPhotos } from 'src/redux/action/user';
import { usePinterestDispatch, usePinterestSelector } from 'src/redux/hooks';
import UserServices from 'src/service/user.services';
import {
  closeInputCss,
  fileInputCss,
  formCss,
  hrCss,
  imgPreviewCss,
  inputImgPreviewCss,
  inputTitleCss,
  showInputCss,
  showInputTextCss,
} from './ElementCss';
import './Post.scss';
import { ContentContainer, FormWrapper, ImgWrapper } from './PostComponents';

interface PostProps {
  isPostOpen: boolean;
  closePost: () => void;
}

interface PostForm {
  file: File;
  text: string;
}

const Post: FC<PostProps> = ({ isPostOpen, closePost }) => {
  const [file, setFile] = useState<File | undefined>();
  const [imgPreviewUrl, setImg] = useState<string | ArrayBuffer>();
  const { register, handleSubmit } = useForm<PostForm>();
  const dispatch = usePinterestDispatch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputImg = e.target.files![0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setFile(inputImg);
      setImg(reader!.result!);
    };
    setFile(inputImg);
    reader.readAsDataURL(inputImg);
  };
  const userInfo = usePinterestSelector((state) => state.userReducer.user);

  const isLoad = usePinterestSelector((state) => state.userReducer.isLoad);

  const onSubmit = (data: any) => {
    const { status } = data;

    let formData = new FormData();
    formData.append('userID', userInfo._id);
    formData.append(
      'photoOfUser',
      userInfo.firstName + ' ' + userInfo.lastName
    );
    formData.append('status', status);
    formData.append('linkFile', file!);

    UserServices.postWithTicket(formData)
      .then(() => {
        dispatch(setMessage('Uploaded!!.', 'success'));
        closePost();
        dispatch(loadPhotos(!isLoad));
      })
      .catch((err: any) => {
        console.log('Err: ', err.message);
      });
  };

  let $imagePreview = imgPreviewUrl ? (
    <div className="imgPreview" style={imgPreviewCss}>
      <CloseOutlined style={closeInputCss} onClick={() => setImg('')} />
      <img
        src={imgPreviewUrl! as string}
        alt="Preview"
        style={inputImgPreviewCss}
      />
    </div>
  ) : (
    ''
  );

  let $showInput = imgPreviewUrl ? (
    ''
  ) : (
    <div className="input" style={showInputCss}>
      <p style={showInputTextCss}>Drag and drop or click here to upload:</p>

      <input
        id="file-input"
        type="file"
        accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp"
        aria-hidden="true"
        style={fileInputCss}
        {...register('file')}
        onChange={(e) => handleImageChange(e)}
      />
    </div>
  );

  return isPostOpen ? (
    <div className="overlay">
      <form onSubmit={handleSubmit(onSubmit)} style={formCss}>
        <div className="wrapper">
          <div className="postImg-form">
            <div className="title" style={{ width: '100%', height: '30px' }}>
              <h1 className="post-title">Post Your Image</h1>
            </div>

            <span className="close" onClick={closePost}>
              <IconButton>
                <Close fontSize="large" />
              </IconButton>
            </span>

            <ContentContainer>
              <ImgWrapper>
                {$showInput} {$imagePreview}
              </ImgWrapper>

              <FormWrapper className="form">
                <input
                  type="text"
                  placeholder="Create a title"
                  style={inputTitleCss}
                />
                <hr style={hrCss} />

                <textarea
                  {...register('text')}
                  placeholder="What's in your mind?"
                />

                <hr style={hrCss} />

                <input className="submit-button" type="submit" value="post" />
              </FormWrapper>
            </ContentContainer>
          </div>
        </div>
      </form>
    </div>
  ) : (
    <></>
  );
};

export default Post;
