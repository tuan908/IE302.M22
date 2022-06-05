import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { PixabayPhoto } from 'src/api';
import { PinWrapper } from './Component';

interface Props extends PixabayPhoto {}

const Pin: FC<Props> = ({ id, webformatURL, ...otherImageProps }: Props) => {
  const navigate = useNavigate();

  const pinState = {
    id,
    webformatURL,
    ...otherImageProps,
  };

  return (
    <PinWrapper
      onClick={() =>
        navigate(`/image/${id}`, {
          state: pinState,
        })
      }
    >
      <img
        src={webformatURL}
        style={{ display: 'block', width: '100%' }}
        alt=""
      />
    </PinWrapper>
  );
};

export default Pin;
