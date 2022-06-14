import { Bookmark, GridOn, Settings } from '@mui/icons-material';
import { Avatar, Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserProfile } from 'src/service/user.service';
import GoBackButton from 'src/ui/Button/GoBack';
import Posted from './Posted';
import SettingProfile from './SettingProfile';

import './styles.scss';

interface User {
  userIdFromLocalStorage: string;
}

export interface PinterestImage {
  base64ImageString: string;
  content: string;
  createdTime: Date;
  postId: string;
  postReactCount: number;
  postStatus: string;
  postTitle: string;
  postUrl: string;
  updatedTime: string;
  username: string;
  imgUrlFromSave?: string;
  author?: string;
}

type UserInfo = {
  avatarUrl?: string;
  email?: string;
  list: PinterestImage[];
  username: string;
  userId: string;
  nameDisplay: string;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type HandleChangeFunction = (
  event: React.SyntheticEvent<Element, Event>,
  value: any
) => void;

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...otherProps } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...otherProps}
    >
      {value === index && (
        <Box style={{ marginTop: '12%' }}>
          <Box display="flex" justifyContent="center" alignItems="center">
            {children}
          </Box>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function PinterestProfile() {
  const location = useLocation();

  const userIdFromLocalStorage = location.state as User;

  const [userInfo, setUserInfo] = useState<UserInfo>();

  const [value, setValue] = useState(0);

  const handleChange: HandleChangeFunction = (_, newValue: number) => {
    setValue(newValue);
  };

  async function getUserInformation() {
    const rawData = await getUserProfile(userIdFromLocalStorage.toString());
    setUserInfo(rawData.data);
  }

  useEffect(() => {
    getUserInformation();
  }, []);

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid
          style={{
            top: '0',
            position: 'fixed',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '30%',
            zIndex: '100',
            backgroundColor: '#efefef',
            width: '100%',
          }}
        >
          <Avatar
            src={userInfo?.avatarUrl || ''}
            alt={userInfo?.username}
            sx={{ width: '100px', height: '100px' }}
          />

          <Typography sx={{ fontWeight: '750' }} variant="h3">
            {userInfo?.username || ''}
          </Typography>

          <Typography variant="h6">
            {userInfo?.email || 'user@gmail.com'}
          </Typography>

          <Grid
            item
            alignItems="center"
            justifyContent="center"
            sx={{ paddingTop: '1.25rem' }}
          >
            <Tabs value={value} onChange={handleChange}>
              <Tab
                label="POSTS"
                {...a11yProps(0)}
                icon={<GridOn />}
                iconPosition="start"
              />
              <Tab
                label="SAVED"
                {...a11yProps(1)}
                icon={<Bookmark />}
                iconPosition="start"
              />
              <Tab
                label="SETTINGS"
                {...a11yProps(2)}
                icon={<Settings />}
                iconPosition="start"
              />
            </Tabs>
          </Grid>
        </Grid>

        <Grid>
          <GoBackButton />
          <TabPanel value={value} index={0} />
          <TabPanel value={value} index={1}>
            <Posted listPostId={userInfo?.list!} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <SettingProfile userInfo={userInfo?.username} />
          </TabPanel>
        </Grid>
      </Grid>
    </>
  );
}

export default PinterestProfile;
