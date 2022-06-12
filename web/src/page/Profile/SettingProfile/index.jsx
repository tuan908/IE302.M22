import { useState } from 'react';
import { TextField, Grid, Button } from '@mui/material';

import { useForm } from 'react-hook-form';
import EditIcon from '@mui/icons-material/Edit';

const SettingProfile = ({ userInfo }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        setFocus,
        getValues
    } = useForm();

    // set default value
    // setValue('userName', userInfo);

    // state on mouse hover
    const [mouseHover, setMouseHover] = useState(true);
    const [mouseHover1, setMouseHover1] = useState(true);

    // state -> active input
    const [disableUserName, setDisableUserName] = useState(true);

    // state -> active change pw
    const [activeChangeInput, setActiveChangeInput] = useState(false);

    const onSubmit = handleSubmit((value) => {
        console.log(value);

        if (!activeChangeInput && getValues('userName')!== userInfo){
            // call api change user name
        } else
        if (activeChangeInput) {
            // call api change input & user name
        }
        else {
            // show log 
        }

        
    });

    const handleCancel = () => {
        setValue('userName', userInfo);
        setValue('oldPw', '');
        setDisableUserName(true);
        setActiveChangeInput(false);
    };

    const handleSave = () => {
       

    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <Grid container sx={{ justifyContent: 'center' }}>
                    <Grid item>
                        <Grid container direction={'column'}>
                            <Grid item>
                                <Grid
                                    container
                                    sx={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    onMouseOver={() => {
                                        setMouseHover(false);
                                    }}
                                    onMouseOut={() => {
                                        setMouseHover(true);
                                    }}
                                >
                                    <Grid item>
                                        <TextField
                                            {...register('userName', {required: {value: true, message: 'required'}})}
                                            id="outlined-basic"
                                            disabled={disableUserName}
                                            label="User Name"
                                            variant="outlined"
                                            margin="normal"
                                            size="small"
                                            defaultValue={userInfo}
                                        />
                                    </Grid>
                                    <Grid
                                        item
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <EditIcon
                                            onClick={() => {
                                                setFocus('userName');
                                                setDisableUserName(false);
                                            }}
                                            sx={mouseHover && { opacity: '0' }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Grid
                                    container
                                    sx={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                    onMouseOver={() => {
                                        setMouseHover1(false);
                                    }}
                                    onMouseOut={() => {
                                        setMouseHover1(true);
                                    }}
                                >
                                    <Grid item>
                                        <TextField
                                            {...register('oldPw',{})}
                                            id="outlined-basic"
                                            disabled={!activeChangeInput}
                                            label="Password"
                                            variant="outlined"
                                            margin="normal"
                                            size="small"
                                            type={'password'}
                                        />
                                        <div>{errors?.oldPw.message}</div>
                                    </Grid>
                                    <Grid
                                        item
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <EditIcon
                                            sx={mouseHover1 && { opacity: '0' }}
                                            onClick={() => {
                                                setFocus('oldPw');
                                                setActiveChangeInput(true);
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            {activeChangeInput && (
                                <>
                                    <Grid item>
                                        <Grid
                                            container
                                            sx={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Grid item>
                                                <TextField
                                                    {...register('newPw', {required: {value: true, message: 'required'}})}
                                                    id="outlined-basic"
                                                    label="New Password"
                                                    variant="outlined"
                                                    margin="normal"
                                                    size="small"
                                                    type={'password'}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <EditIcon
                                                    sx={{ opacity: '0' }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Grid
                                            container
                                            sx={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <Grid item>
                                                <TextField
                                                    {...register('cfNewPw', {required: {value: true, message: 'required'}})}
                                                    id="outlined-basic"
                                                    // disabled
                                                    label="Confirm New Password"
                                                    variant="outlined"
                                                    margin="normal"
                                                    size="small"
                                                    type={'password'}
                                                />
                                            </Grid>
                                            <Grid
                                                item
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                            >
                                                <EditIcon
                                                    sx={{ opacity: '0' }}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    container
                    sx={{ justifyContent: 'center', marginTop: '20px' }}
                >
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>

                    <Button
                        type={'submit'}
                        variant="contained"
                        sx={{ margin: '0 20px 0 30px' }}
                        // onClick={handleSave}
                    >
                        Save
                    </Button>
                </Grid>
            </form>
        </div>
    );
};

export default SettingProfile;
