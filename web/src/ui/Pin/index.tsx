import { Download } from '@mui/icons-material';
import { Tooltip } from '@mui/material';
import axios from 'axios';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PixabayPhoto } from 'src/api';
import { v4 } from 'uuid';
import { PinWrapper } from './Component';

interface Props extends PixabayPhoto {}

const Pin: FC<Props> = ({ id, webformatURL, ...otherImageProps }: Props) => {
  const navigate = useNavigate();

  const [isDisplay, setDisplay] = useState(false);

  const pinState = {
    id,
    webformatURL,
    ...otherImageProps,
  };

  function onMouseEnter() {
    setDisplay(true);
  }

  function onMouseLeave() {
    setDisplay(false);
  }

  function onDownload() {
    const imageName = v4();

    axios
      .get(webformatURL, {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/pdf',
        },
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const linkDownload = document.createElement('a');

        linkDownload.setAttribute('download', `${imageName}.png`);
        linkDownload.href = url;
        document.body.appendChild(linkDownload);
        linkDownload.click();
      });
  }

  return (
    <PinWrapper
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
      style={{ position: 'relative' }}
    >
      <Tooltip title="Download">
        <Download
          style={{ display: isDisplay ? '' : 'none', position: 'absolute' }}
          onClick={() => onDownload()}
        />
      </Tooltip>
      <img
        src={webformatURL}
        style={{ display: 'block', width: '100%' }}
        alt=""
        onClick={() =>
          navigate(`/image/${id}`, {
            state: pinState,
          })
        }
      />
    </PinWrapper>
  );
};

export default Pin;
