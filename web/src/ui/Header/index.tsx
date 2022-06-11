import FaceIcon from '@mui/icons-material/Face';
import KeyboardArrowIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PinterestIcon from '@mui/icons-material/Pinterest';
import SearchIcon from '@mui/icons-material/Search';
import TextSMSIcon from '@mui/icons-material/Textsms';
import {
  Avatar,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Tooltip,
} from '@mui/material';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getPhotoListByKeyword,
  getStartPhotoList,
  PixabayPhoto,
} from 'src/api';
import useDebounce from 'src/hook/useDebounce';
import { PinterestUserInfo } from 'src/util/user';
import { logout } from '../../service/auth.service';
import { sidePages } from '../../util/page';
import {
  Container,
  IconsWrapper,
  LogoWrapper,
  SearchBarWrapper,
  SearchWrapper,
  Wrapper,
} from './Component';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [photoList, setPhotoList] = useState<PixabayPhoto[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const push = useNavigate();
  let userInfo = JSON.parse(
    localStorage.getItem('user_info')!?.toString()
  ) as PinterestUserInfo;

  const userIdFromLocalStorage = userInfo.userId;
  const token = userInfo.token;
  const DELAY_TIME = 500; //ms

  const debouncedKeyword = useDebounce(keyword, DELAY_TIME);

  useEffect(() => {
    if (!keyword.trim()) {
      return;
    }
    getPhotoListByKeyword(debouncedKeyword).then((data) => {
      setPhotoList(data);
    });
  }, [debouncedKeyword]);

  const handleSubmitSearchImage: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    const sortedList = photoList.sort(() => 0.5 - Math.random());
    push(`/search?q=${keyword}`, { state: sortedList });
  };

  async function getNewPhotosFromApi() {
    const photos = await getStartPhotoList();
    try {
      return photos;
    } catch (error: any) {
      console.error(error.message);
    } finally {
      return photos;
    }
  }

  useEffect(() => {
    getNewPhotosFromApi();
  }, []);

  const clickAwayHandler = () => setIsMenuOpen(!isMenuOpen);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    push('/login');
  };

  const handleClose = (path: string) => {
    toggleMenu();
    if (path) {
      push(path);
    } else handleLogout();
  };

  return (
    <Container>
      <Wrapper>
        <LogoWrapper>
          <Link to="/home">
            <Tooltip title="Home">
              <PinterestIcon
                className="pinterest-icon"
                style={{ height: 50, width: 50 }}
              />
            </Tooltip>
          </Link>
        </LogoWrapper>

        <SearchWrapper>
          <SearchBarWrapper>
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.currentTarget.value)}
            />
            <IconButton onClick={handleSubmitSearchImage}>
              <SearchIcon />
            </IconButton>
          </SearchBarWrapper>
        </SearchWrapper>

        <IconsWrapper>
          <IconsWrapper>
            <IconButton>
              <Tooltip title="Message">
                <TextSMSIcon style={{ height: 30, width: 30 }} />
              </Tooltip>
            </IconButton>

            <IconButton>
              <Tooltip title="Notification">
                <NotificationsIcon style={{ height: 30, width: 30 }} />
              </Tooltip>
            </IconButton>

            <IconButton
              onClick={() =>
                push(`/user/${userIdFromLocalStorage}`, {
                  state: userIdFromLocalStorage,
                })
              }
            >
              <Tooltip title="User">
                {token ? (
                  <Avatar style={{ height: 40, width: 40 }} />
                ) : (
                  <FaceIcon />
                )}
              </Tooltip>
            </IconButton>

            <IconButton onClick={toggleMenu}>
              <div ref={ref}>
                <KeyboardArrowIcon
                  className="header-user-profile"
                  style={{ height: 30, width: 30 }}
                />
              </div>
            </IconButton>
          </IconsWrapper>

          <Popper
            open={isMenuOpen}
            transition
            anchorEl={ref!.current}
            disablePortal
            className="popper"
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === 'bottom' ? 'center top' : 'center bottom',
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={clickAwayHandler}>
                    <MenuList>
                      {sidePages.map(({ path, pageName }, index) => {
                        return (
                          <MenuItem
                            key={index}
                            onClick={() => handleClose(path!)}
                          >
                            {pageName}
                          </MenuItem>
                        );
                      })}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </IconsWrapper>
      </Wrapper>
    </Container>
  );
}

export default Header;
