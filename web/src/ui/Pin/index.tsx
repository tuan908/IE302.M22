import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  Avatar,
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
import { createUserPost } from 'src/service/user.service';
import { v4 } from 'uuid';
import { PostDetail } from '../Post';

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
        setOpen(false);
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
                const url = window.URL.createObjectURL(
                    new Blob([response.data])
                );
                const linkDownload = document.createElement('a');

                linkDownload.setAttribute('download', `${imageName}.png`);
                linkDownload.href = url;
                document.body.appendChild(linkDownload);
                linkDownload.click();
            });
    }

    async function saveToCollection() {
        const data: PostDetail = {
            base64ImageString: '',
            content: '',
            category: otherImageProps.tags,
            postReactCount: otherImageProps.likes,
            postStatus: '',
            title: '',
            username: 'admin',
            author: otherImageProps.user,
            imgUrlFromSave: webformatURL,
        };
        await createUserPost(data);
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
                border: '.01rem solid rgba(212, 203, 203, 0)',
                cursor: 'pointer',
                objectFit: 'contain',
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
                onClick={saveToCollection}
            >
                Save
            </Button>

            <IconButton
                onClick={handleClick('bottom-start')}
                style={{
                    borderRadius: '50%',
                    position: 'absolute',
                    left: '5%',
                    top: '5%',
                    display: isDisplay ? '' : 'none',
                    zIndex: 10,
                    backgroundColor: 'rgba (0,0,0,1)'
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
                            <List sx={{padding: '0'}}>
                                <ListItemButton sx={{padding: '0 5px'}} onClick={() => onDownload()}>
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
                loading="lazy"
            />
            <Box
                sx={{
                    height: 'min-content',
                    width: '100%',
                    color: 'rgba(255, 255, 255, 0.54)',
                    position: 'absolute',
                    bottom: '0',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    overflow: 'hidden', 
                    marginBottom: '2.7px',
                    display: isDisplay ? '' : 'none',
                }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  margin: '9px 9px',
                  fontStyle: 'italic'
                }}
              >
              <Avatar src={otherImageProps.userImageURL} sx={{ width: 24, height: 24 }}/>
                <p style={{margin: '0 9px', fontSize: '0.8rem'}}>
                  @{otherImageProps.user}
                </p>
              </Box> 
            </Box>
        </Box>
    );
};

export default Pin;
