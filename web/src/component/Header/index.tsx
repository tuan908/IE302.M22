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
import { History } from 'history';
import { map } from 'lodash';
import {
  Dispatch,
  FC,
  MouseEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ApiServices from 'src/api';
import { PinterestMenuScreen, PinterestScreenTypes } from '../../config/page';
import { getCurrentUser } from '../../redux/action/user';
import AuthorizationServices from '../../service/auth.service';
import UserServices from '../../service/user.services';
import {
  IconsWrapper,
  LogoWrapper,
  SearchBarWrapper,
  SearchWrapper,
  Wrapper,
} from './HeaderStyledComponent';

interface PinterestHeaderProps {
  history?: History;
}

interface UserProfile {
  avatarUrl?: string;
}

const { getUserProfile } = UserServices;
const { handleLogout: logOutFn } = AuthorizationServices;
const { getNewPhotoList, getPhotoList } = ApiServices;

const PinterestHeader: FC<PinterestHeaderProps> = ({
  history,
}: PinterestHeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>();
  const [userInput, setUserInput] = useState<string>();

  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch<Dispatch<any>>();

  const handleSubmitSearchImage: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    const requestedPhotoList = await getPhotoList(userInput!);
    const sortedRequestedPhotoList = requestedPhotoList?.sort(
      () => 0.5 - Math.random()
    );
    setUserInput('');
    dispatch(sortedRequestedPhotoList);
  };

  const getNewPhotosFromApi = async () => {
    try {
      const photos = await getNewPhotoList();
      return photos;
    } catch (error: any) {
      console.error(error.message);
    } finally {
      return 1;
    }
  };

  const getUserAvatar = async () => {
    const userInfo = await getUserProfile();
    try {
      const { data } = userInfo!;
      setUserProfile(data);
      dispatch(getCurrentUser(data));
    } catch (error: any) {
      console.error(error.message);
    } finally {
      return userInfo;
    }
  };

  useEffect(() => {
    getNewPhotosFromApi();
    getUserAvatar();
  }, []);

  const ClickAwayListenerFn = () => setIsMenuOpen(!isMenuOpen);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logOutFn();
    history!.push('/login');
  };

  const handleClose = (path: string) => {
    toggleMenu();
    if (path !== '/signout') {
      history!.push(path);
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
        <IconButton onClick={() => history!.push('/profile')}>
          {!userProfile ? (
            <FaceIcon />
          ) : (
            <Avatar
              style={{ height: 40, width: 40 }}
              src={userProfile!.avatarUrl}
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
              <ClickAwayListener onClickAway={ClickAwayListenerFn}>
                <MenuList>
                  {map(
                    PinterestMenuScreen,
                    ({ path, name }: PinterestScreenTypes) => {
                      return (
                        <MenuItem key={path} onClick={() => handleClose(path!)}>
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

export default PinterestHeader;
