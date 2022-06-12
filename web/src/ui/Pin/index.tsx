import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Box,
  Button,
  Fade,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popper,
  PopperPlacementType,
} from '@mui/material';
import axios from 'axios';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PixabayPhoto } from 'src/api';
import { v4 } from 'uuid';

interface Props extends PixabayPhoto {}

const Pin: FC<Props> = ({ id, webformatURL, ...otherImageProps }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();

  const [placement, setPlacement] = useState<PopperPlacementType>();
  const [isDisplay, setDisplay] = useState(false);
  const [isOpenPopup, setOpen] = useState(false);

  const handleClick =
    (newPlacement: PopperPlacementType) =>
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
      setOpen((prev) => placement !== newPlacement || !prev);
      setPlacement(newPlacement);
    };

  const navigate = useNavigate();

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
    <Box
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
      style={{
        display: 'block',
        position: 'relative',
        borderRadius: '16px',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        marginTop: '.5rem',
        boxShadow: '1px 1px solid black',
        border: '.01rem solid rgba(212, 203, 203, 0.4)',
      }}
    >
      <Button
        style={{
          display: isDisplay ? '' : 'none',
          position: 'absolute',
          top: '5%',
          right: '5%',
          backgroundColor: 'red',
          color: 'white',
        }}
      >
        Save
      </Button>

      <IconButton
        onClick={handleClick('bottom-start')}
        style={{
          borderRadius: '50%',
          position: 'absolute',
          right: '5%',
          bottom: '5%',
          display: isDisplay ? '' : 'none',
        }}
      >
        <MoreHorizIcon />
      </IconButton>

      <Popper
        open={isOpenPopup}
        anchorEl={anchorEl}
        placement={placement}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <List>
                <ListItemButton onClick={() => onDownload()}>
                  <ListItemText primary="Download" />
                </ListItemButton>
              </List>
            </Paper>
          </Fade>
        )}
      </Popper>

      <img
        src={webformatURL}
        alt=""
        onClick={() =>
          navigate(`/image/${id}`, {
            state: pinState,
          })
        }
        style={{
          width: '100%',
        }}
      />
    </Box>
  );
};

export default Pin;
