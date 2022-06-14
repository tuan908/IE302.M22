import FaceIcon from '@mui/icons-material/Face';
import KeyboardArrowIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import TextSMSIcon from '@mui/icons-material/Textsms';
import {
  Avatar,
  Button,
  CircularProgress,
  ClickAwayListener,
  Grow,
  IconButton,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Tooltip,
} from '@mui/material';
import {
  Fragment,
  MouseEventHandler,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getPhotoListByKeyword,
  getStartPhotoList,
  PixabayPhoto,
} from 'src/api';
import PinterestIcon from 'src/asset/images/logo.png';
import useDebounce from 'src/hook/useDebounce';
import { usePinterestSelector } from 'src/redux/hooks';
import { defaultKeyword } from 'src/util/keyword';
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
  const [clickedKeyword, setClickedKeyword] = useState<string>('');

  const ref = useRef<HTMLDivElement>(null);
  const push = useNavigate();
  const [userId, setUserId] = useState();
  const [token, setToken] = useState();

  // active search keyword
  const [getIndex, setGetIndex] = useState(-1)

  const userInfo = usePinterestSelector((state) => state.initLoginStateReducer);

  useEffect(() => {
    if (userInfo) {
      setToken(userInfo.token);
      setUserId(userInfo.userId);
    } else {
      push('/login', {
        replace: true,
      });
    }
  }, [userInfo]);

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

  useEffect(() => {
    getPhotoListByKeyword(clickedKeyword).then((data) => {
      setPhotoList(data);
    });
  }, []);

  function handleSearchByClickedKeyword(item: string) {
    console.log(item);
    setClickedKeyword(item);
    const sortedList = photoList.sort(() => 0.5 - Math.random());
    push(`/search?q=${clickedKeyword}`, { state: sortedList });
  }

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
    <Suspense fallback={<CircularProgress />}>
      <Container>
        <Wrapper>
          <LogoWrapper>
            <Link to="/home">
              <Tooltip title="Home">
                <img
                  src={PinterestIcon}
                  style={{ width: '50px', height: '50px', borderRadius: '50%' }}
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
                  push(`/user/${userId}`, {
                    state: userId,
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
        <div
          style={{
            padding: '0 .75em',
            display: 'inline-flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            width: '80%',
          }}
        >
          {defaultKeyword.map((item, index) => (
            <Fragment key={index}>
              <Button
                color="info"
                onClick={() => {handleSearchByClickedKeyword(item); setGetIndex(index)}}
                sx={index === getIndex ? {textTransform: 'none', borderBottom: '3px solid #0000ff', borderRadius: 0} :{textTransform: 'none'} }
              >
                {item}
              </Button>
            </Fragment>
          ))}
        </div>
      </Container>
    </Suspense>
  );
}

export default Header;
