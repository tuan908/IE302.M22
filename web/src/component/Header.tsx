import { map } from 'lodash';
import { useState, useEffect, useRef, FC, MouseEventHandler } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Wrapper,
  LogoWrapper,
  SearchWrapper,
  SearchBarWrapper,
  IconsWrapper,
} from './HeaderStyledComponent';
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
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowIcon from '@mui/icons-material/KeyboardArrowDown';
import FaceIcon from '@mui/icons-material/Face';
import { getPhotoList } from '../api';
import { History } from 'history';
import { PinterestMenuScreen, PinterestScreenTypes } from '../config/page';

interface PinterestHeaderProps {
  history?: History;
}

const PinterestHeader: FC<PinterestHeaderProps> = ({
  history,
}: PinterestHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<>();
  const [userInput, setUserInput] = useState<string>();

  const ref = useRef<>();
  const dispatcher = useDispatch<>();

  const handleSubmitSearchImage: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    const requestedPhotoList = await getPhotoList(userInput);
    const sortedRequestedPhotoList = requestedPhotoList.sort(
      () => 0.5 - Math.random()
    );
    setUserInput('');
    dispatcher(sortedRequestedPhotoList);
  };
  useEffect(async () => {
    getNewPins().then((value) => {
      // console.log("Pins lúc này: ", pins);
      dispatch(apiPins(value));
    });

    //Lấy ảnh đại diện
    userService
      .getProfile()
      .then((res) => {
        setUserProfile(res);
        dispatch(getCurrentUser(res));
      })
      .catch((err) => {});
  }, []);

  const ClickAwayListenerFn = () => setIsMenuOpen(!isMenuOpen);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    authService.logout();
    history.push('/login');
  };

  const handleClose = (path: string) => {
    toggleMenu();
    if (path !== '/signout') {
      history.push(path);
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
              onChange={(e) => setUserInput(e.currentTarget.value)}
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
        <IconButton onClick={(e) => history.push('/profile')}>
          {!userProfile ? (
            <FaceIcon />
          ) : (
            <Avatar
              style={{ height: 40, width: 40 }}
              src={userProfile.profilePhoto}
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
        anchorEl={ref.current}
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
              <ClickAwayListener onClickAway={ClickAwayListenerFn}>
                <MenuList>
                  {map(
                    PinterestMenuScreen,
                    ({ path, name }: PinterestScreenTypes) => {
                      return (
                        <MenuItem key={path} onClick={() => handleClose(path)}>
                          {name}
                        </MenuItem>
                      );
                    }
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Wrapper>
  );
};
