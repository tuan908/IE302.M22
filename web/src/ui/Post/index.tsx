import { Close, CloseOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import setMessage from 'src/redux/action/message';
import { loadPhotos } from 'src/redux/action/user';
import { usePinterestDispatch, usePinterestSelector } from 'src/redux/hooks';
import { createUserPost } from 'src/service/user.service';
import { ContentContainer, FormWrapper, ImgWrapper } from './Component';
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

interface PostProps {
  isPostOpen: boolean;
  closePost: () => void;
}

interface PostForm {
  file: File;
  text: string;
  title: string;
}

export interface PostDetail {
  username: string;
  base64ImageString: string;
  postReactCount: number;
  postStatus: string;
  title: string;
  content: string;
}

const Post: FC<PostProps> = ({ isPostOpen, closePost }) => {
  const [imgPreviewUrl, setImg] = useState<string | ArrayBuffer>();
  const { register, handleSubmit } = useForm<PostForm>();
  const dispatch = usePinterestDispatch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const inputImg = e.target.files![0];
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64Img = reader!.result!;
      setImg(base64Img);
    };
    reader.readAsDataURL(inputImg);
  };
  const userInfo = usePinterestSelector((state) => state.userReducer.user);

  const isLoad = usePinterestSelector((state) => state.userReducer.isLoad);

  const onSubmit = (data: any) => {
    const { status, text, title } = data;

    const imgDataString = imgPreviewUrl!.toString();

    const postDetail: PostDetail = {
      base64ImageString: imgDataString,
      postReactCount: 0,
      postStatus: status,
      username: userInfo.username,
      title,
      content: text,
    };

    uploadNewPost(postDetail);
  };

  async function uploadNewPost(postDetail: PostDetail) {
    try {
      await createUserPost(postDetail);
      dispatch(setMessage('Uploaded!!.', 'success'));
      closePost();
      dispatch(loadPhotos(!isLoad));
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
    }
  }

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
                  {...register('title')}
                />
                <hr style={hrCss} />

                <textarea
                  {...register('text')}
                  placeholder="What's in your mind?"
                />

                <hr style={hrCss} />

                <input className="submit-button" type="submit" value="Post" />
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