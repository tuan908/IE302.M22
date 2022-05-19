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
import { sidePages } from '../../common/page';
import AuthorizationServices from '../../service/auth.service';
import {
  IconsWrapper,
  LogoWrapper,
  SearchBarWrapper,
  SearchWrapper,
  Wrapper,
} from './HeaderComponents';

const { logout } = AuthorizationServices;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  // const [userProfile, setUserProfile] = useState<UserProfile | undefined>();
  const [keyword, setKeyword] = useState<string>('');
  const [photoList, setPhotoList] = useState<PixabayPhoto[]>([]);
  const ref = useRef<HTMLDivElement>(null);
  // const dispatch = useDispatch<Dispatch<any>>();
  const push = useNavigate();
  const userId = localStorage.getItem('userId');
  const DELAY_TIME = 500; //ms

  const debouncedKeyword = useDebounce(keyword, DELAY_TIME);
  console.log(debouncedKeyword);

  useEffect(() => {
    if (!keyword.trim()) {
      return;
    }
    getPhotoListByKeyword(debouncedKeyword).then((data) => {
      console.log(data);

      setPhotoList(data);
    });
  }, [debouncedKeyword]);

  const handleSubmitSearchImage: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    console.log(photoList);

    const sortedList = photoList.sort(() => 0.5 - Math.random());
    document.getElementById('search__input')!.textContent = '';
    console.log(sortedList);

    // dispatch(getPinDataFromApi(sortedRequestedPhotoList));
  };

  const getNewPhotosFromApi = async () => {
    try {
      const photos = await getStartPhotoList();
      return photos;
    } catch (error: any) {
      console.error(error.message);
    } finally {
      return 1;
    }
  };

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
          <IconButton onClick={handleSubmitSearchImage}>
            <SearchIcon />
          </IconButton>
          <form>
            <input
              type="text"
              onChange={(e) => setKeyword(e.currentTarget.value)}
              id="search__input"
            />
            <button type="submit" onClick={handleSubmitSearchImage} />
          </form>
        </SearchBarWrapper>
      </SearchWrapper>
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
        <IconButton onClick={() => push(`/user/${userId}`, { state: userId })}>
          {!userId ? (
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
                      <MenuItem key={index} onClick={() => handleClose(path!)}>
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
    </Wrapper>
  );
};

export default Header;
