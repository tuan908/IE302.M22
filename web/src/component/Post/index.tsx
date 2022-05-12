import { FC, useState } from 'react';
import { usePinterestDispatch, usePinterestSelector } from 'src/redux/hooks';
import { useForm } from 'react-hook-form';

import './Post.scss';
import setMessage from 'src/redux/action/message';
import { IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';
import { loadPhotos } from 'src/redux/action/user';
import { ContentContainer, ImgWrapper, FormWrapper } from './Component';
import UserServices from 'src/service/user.services';

interface IPostProps {
  isPostOpen: boolean;
  closePost: () => void;
}

interface IPostFormValues {
  file: File;
  text: string;
}

const Post: FC<IPostProps> = ({ isPostOpen, closePost }) => {
  const [file, setFile] = useState<File | undefined>();
  const [imagePreviewUrl, setImg] = useState<string | ArrayBuffer>();
  const { register, handleSubmit } = useForm<IPostFormValues>();
  const dispatch = usePinterestDispatch();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    let reader = new FileReader();

    reader.onloadend = () => {
      setFile(e.currentTarget.files![0]);
      setImg(reader!.result!);
    };

    setFile(e.currentTarget.files![0]);
    reader.readAsDataURL(e.currentTarget.files![0]);
  };
  const userInfo = usePinterestSelector((state) => state.userReducer.user);

  //Khi user thêm ảnh hoặc xóa ảnh thì sẽ thay đổi biến này dê load lại hình ảnh
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

  let $imagePreview = imagePreviewUrl ? (
    <div
      className="imgPreview"
      style={{
        border: '1px solid black',
        borderRadius: '20px',
        position: 'relative',
      }}
    >
      <img
        src={imagePreviewUrl! as string}
        alt="Preview"
        style={{
          borderRadius: '20px',
          position: 'absolute',
          left: 0,
          objectFit: 'cover',
        }}
      />
      <input
        id="file-input"
        type="file"
        accept="video/*, image/*"
        aria-hidden="true"
        style={{
          cursor: 'pointer',
          width: '100%',
          height: '100%',
          opacity: '0',
          zIndex: '999',
          position: 'absolute',
          left: 0,
        }}
        {...register('file')}
        onChange={(e) => handleImageChange(e)}
      />
    </div>
  ) : (
    ''
  );

  let $showInput = imagePreviewUrl ? (
    ''
  ) : (
    <div
      className="input"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        borderRadius: '20px',
      }}
    >
      <p style={{ position: 'absolute', textAlign: 'center', width: '100%' }}>
        Drag and drop or click here to upload{' '}
      </p>

      <input
        id="file-input"
        type="file"
        accept="image/bmp,image/gif,image/jpeg,image/png,image/tiff,image/webp"
        aria-hidden="true"
        style={{
          cursor: 'pointer',
          width: '100%',
          height: '100%',
          opacity: '0',
        }}
        {...register('file')}
        onChange={(e) => handleImageChange(e)}
      />
    </div>
  );

  return isPostOpen ? (
    <div className="overlay">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
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
                  style={{
                    border: 'none',
                    height: '40px',
                    fontSize: '24px',
                    outline: 'none',
                    width: '100%',
                    paddingLeft: '10px',
                  }}
                />
                <hr
                  style={{
                    opacity: '0.7',
                    width: ' 100%',
                    margin: '0 auto',
                  }}
                />

                <textarea
                  {...register('text')}
                  placeholder="What's in your mind?"
                />

                <hr
                  style={{
                    opacity: '0.7',
                    width: ' 100%',
                    margin: '0 auto',
                  }}
                />

                <input className="submit-button" type="submit" value="post" />
              </FormWrapper>
            </ContentContainer>
          </div>
        </div>
      </form>
    </div>
  ) : (
    ''
  );
};

export default Post;
