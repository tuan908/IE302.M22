import { Typography, Avatar, Tab, Tabs, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserProfile } from 'src/service/user.service';
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
            {console.log(userInfo)}
            <Box className="d-flex profileContainer">
                <Box>
                    <div className="d-flex avatar">
                        <Avatar
                            src={userInfo?.avatarUrl || ''}
                            alt={userInfo?.username}
                            sx={{ width: '100px', height: '100px' }}
                        />
                    </div>
                    <Typography sx={{ fontWeight: '750' }} variant="h3">
                        {userInfo?.username || 'user name'}
                    </Typography>
                    <em>
                        <p>
                            <span
                                style={{
                                    fontStyle: 'itatlic',
                                    marginRight: '5px',
                                    color: '#0000ff',
                                }}
                            >
                                @
                            </span>
                            {userInfo?.email || 'user@gmail.com'}
                        </p>
                    </em>
                    {/* <Button variant="contained">Edit Profile</Button> */}
                </Box>
                {/* sub nav for post and saved*/}
                <Box>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="nav tabs example"
                    >
                        <Tab label="Posted" {...a11yProps(0)} />
                        <Tab label="Saved" {...a11yProps(1)} />
                        <Tab label="Setting" {...a11yProps(2)} />
                    </Tabs>
                </Box>

                <Box>
                    <TabPanel value={value} index={0}>
                        <Posted listPostId={userInfo?.list!}></Posted>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        2
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div>
                            <SettingProfile userInfo={userInfo?.username} />
                        </div>
                    </TabPanel>
                </Box>
            </Box>
        </>
    );
}

export default PinterestProfile;
