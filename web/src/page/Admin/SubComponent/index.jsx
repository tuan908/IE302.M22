import React from 'react'
import {Box} from '@mui/material'


import UserMn from './UserMn'
import PostMn from './PostMn'

function SubComponent({userValue, postValue}) {
    console.log(userValue, postValue)
    if (userValue){
        return (
            <Box sx={{margin: '20px 30px'}}>
                test
                <UserMn />
                
            </Box>
          )
    }

    if (postValue){
        return (
            <Box sx={{margin: '20px 30px'}}>
                <PostMn/>
            </Box>
          )
    }
  
}

export default SubComponent