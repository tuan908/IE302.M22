import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {Grid, ListSubheader} from '@mui/material'
import UserMn from './SubComponent/UserMn';
import SubComponent from './SubComponent';

const UserManagementConst = ['All User']
const PostManagementConst = ['All Post']



export default function Admin() {

    const [userValue, setUserValue] = useState(-1)
    const [postValue, setPostValue] = useState(-1)
    return (
        <div>
            <Grid container>
                <Grid item xs={2} sx={{bgcolor: 'white', borderRight: '1px solid #34baeb'}}>
                <Box>
                    <List>
                        <ListSubheader>
                            User Management
                        </ListSubheader>
                        {UserManagementConst.map(
                            (text, index) => (
                                <ListItem key={text} disablePadding onClick={()=> {setUserValue(index + 1); setPostValue(0)}}>
                                    <ListItemButton>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            )
                        )}
                    </List>
                    <Divider />
                    <List>
                    <ListSubheader>
                            Post Management
                        </ListSubheader>
                        {PostManagementConst.map((text, index) => (
                            <ListItem key={text} disablePadding onClick={()=> {setPostValue(index + 1); setUserValue(0)}}>
                                <ListItemButton>
                                    
                                    <ListItemText primary={text} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>

                </Grid>
                <Grid item>
                    <SubComponent userValue={userValue} postValue={postValue} />
                </Grid>
            </Grid>
        </div>
    );
}
