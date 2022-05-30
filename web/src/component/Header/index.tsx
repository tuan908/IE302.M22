import FaceIcon from '@mui/icons-material/Face';
import KeyboardArrowIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PinterestIcon from '@mui/icons-material/Pinterest';
import SearchIcon from '@mui/icons-material/Search';
import TextsmsIcon from '@mui/icons-material/Textsms';
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
import useDebounce from 'src/hooks/useDebounce';
import { usePinterestSelector } from 'src/redux/hooks';
import { sidePages } from '../../common/page';
import { logout } from '../../service/auth.service';
import {
  Container,
  IconsWrapper,
  LogoWrapper,
  SearchBarWrapper,
  SearchWrapper,
  Wrapper,
} from './HeaderComponents';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [photoList, setPhotoList] = useState<PixabayPhoto[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  const push = useNavigate();
  const user = usePinterestSelector((state) => state.userReducer.user);
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
    document.getElementById('search__input')!.textContent = '';
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
            <PinterestIcon
              className="pinterest-icon"
              style={{ height: 50, width: 50 }}
            />
          </Link>
        </LogoWrapper>
        <SearchWrapper>
          <SearchBarWrapper>
            <input
              type="text"
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
              <Tooltip title="Coming soon">
                <TextsmsIcon style={{ height: 30, width: 30 }} />
              </Tooltip>
            </IconButton>
            <IconButton>
              <Tooltip title="Coming soon">
                <NotificationsIcon style={{ height: 30, width: 30 }} />
              </Tooltip>
            </IconButton>
            <IconButton
              onClick={() => push(`/user/${user.userId}`, { state: user })}
            >
              {!user.userId ? (
                <FaceIcon />
              ) : (
                <Avatar
                  style={{ height: 40, width: 40 }}
                  // src={userProfile!.avatarUrl}
                />
              )}
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
