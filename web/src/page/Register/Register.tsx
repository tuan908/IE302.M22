import { Button, Grid, Typography } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import initLoginStateAfterLogin from 'src/redux/action/login';
import { getCurrentUser } from 'src/redux/action/user';
import { usePinterestDispatch } from 'src/redux/hooks';
import { register as pinterestRegister } from 'src/service/auth.service';
import { saveUserInfoIntoStorage } from 'src/util/user';
import { CssTextField } from '../Login/Component';
import './style.scss';

type RegisterFormValues = {
  username: string;
  password: string;
  email: string;
  confirmPassword: string;
};

const Register = () => {
  const { handleSubmit, register } = useForm<RegisterFormValues>();
  const navigate = useNavigate();
  const dispatch = usePinterestDispatch();
  const onSubmit: SubmitHandler<RegisterFormValues> = async (registerData) => {
    try {
      const rawData = await pinterestRegister(registerData);
      const { data } = rawData;

      if (data) {
        dispatch(getCurrentUser(data));
        dispatch(
          initLoginStateAfterLogin({
            refreshToken: data.refreshToken,
            token: `Bearer ${data.token}`,
            userId: data.userId,
            expiredTime: data.expiredTime,
          })
        );

        saveUserInfoIntoStorage({
          refreshToken: data.refreshToken,
          token: `Bearer ${data.token}`,
          userId: data.userId,
          expiredTime: data.expiredTime,
        });

        navigate('/home', { replace: true });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Grid container className="register">
      <Grid container className="register-content">
        <Grid item className="register__paper">
          <form
            className="register__form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography
              variant="h4"
              sx={{ marginBottom: 3, textAlign: 'center' }}
              gutterBottom
            >
              Register
            </Typography>
            <CssTextField
              {...register('email')}
              type="email"
              sx={{ marginBottom: 1.25 }}
              placeholder="Email"
            />
            <CssTextField
              {...register('username')}
              sx={{ marginBottom: 1.25 }}
              placeholder="Username"
            />
            <CssTextField
              {...register('password')}
              type="password"
              sx={{ marginBottom: 1.25 }}
              placeholder="Password"
            />
            <CssTextField
              {...register('confirmPassword')}
              type="password"
              sx={{ marginBottom: 1.25 }}
              placeholder="Confirm password"
            />
            <div className="login-link">
              Already have an account?&nbsp;
              <Link to="/login">
                <p>Login</p>
              </Link>
            </div>

            <Button
              title="Register"
              type="submit"
              color="primary"
              variant="contained"
              disableElevation
              sx={{ backgroundColor: '#0000ff' }}
            >
              Register
            </Button>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Register;
