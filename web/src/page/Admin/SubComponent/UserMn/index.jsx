import {
    Box,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from '@mui/material';
import React from 'react';
import ItemUser from './ItemUser';



function UserMn() {
    const mock = [
        {
            id: '111111',
            userName: '2',
            password: '333',
            userRole: '1222',
            postList: [1, 2, 3, 4],
        },
        {
            id: '22222',
            userName: '2',
            password: '333',
            userRole: '1222',
            postList: [1, 2, 3, 4],
        },
    ];
    return (
        <div>
            {mock.map((value) => {
                <ItemUser key={value.id} value={value} />;
            })}
        </div>
    );
}

export default UserMn;
