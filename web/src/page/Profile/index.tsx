import {
    Grid,
    Typography,
    Avatar,
    Button,
    Tab,
    Tabs,
    Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserProfile } from 'src/service/user.service';
import Posted from './Posted';
import SettingProfile from './SettingProfile';

interface User {
    userIdFromLocalStorage: string;
}

interface PinterestImage {
    base64ImageString: string;
    content: string;
    createdTime: Date;
    postId: string;
    postReactCount: number;
    postStatus: string;
    postTitle: string;
    postUrl: string;
    updatedTime: string;
    user: string;
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

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
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

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
            {/* <Typography variant="h5" gutterBottom>
        Posts
      </Typography>
      <h4>{userInfo?.username}</h4>

      {userInfo!?.list === null
        ? []
        : userInfo?.list.map(
            ({ postReactCount, createdTime, base64ImageString }, index) => {
              return (
                <Grid key={index}>
                  <Typography>{postReactCount}</Typography>
                  <Typography>{createdTime.toString()}</Typography>
                  <img src={base64ImageString} alt="" />
                </Grid>
              );
            }
          )} */}
            {/* start dev by chien */}
            {console.log(userInfo)}
            <Grid
                container
                className="userPage d-flex justify-content-center text-center"
            >
                <Grid className="userPage_item mb-3" item xs={12}>
                    <div className="d-flex justify-content-center mb-3">
                        <Avatar
                            src={userInfo?.avatarUrl || ''}
                            alt={userInfo?.nameDisplay}
                            sx={{ width: '100px', height: '100px' }}
                        />
                    </div>
                    <Typography sx={{ fontWeight: '750' }} variant="h3">
                        {userInfo?.nameDisplay || 'name display'}
                    </Typography>
                    <p>@{userInfo?.email || 'user@gmail.com'}</p>
                    <Button variant="contained">Edit Profile</Button>
                </Grid>
                {/* sub nav for post and saved*/}
                <Grid item xs={12} className={'d-flex justify-content-center'}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="nav tabs example"
                    >
                        <Tab label="Posted" {...a11yProps(0)} />
                        <Tab label="Saved" {...a11yProps(1)} />
                        <Tab label="Setting" {...a11yProps(2)} />
                    </Tabs>
                </Grid>

                <Grid item xs={12}>
                    <TabPanel value={value} index={0}>
                        <Posted listPostId={userInfo?.list}></Posted>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        2
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div style={{ width: '200px !important' }}>
                            <SettingProfile />
                        </div>
                    </TabPanel>
                </Grid>
            </Grid>
        </>
    );
}

export default PinterestProfile;
