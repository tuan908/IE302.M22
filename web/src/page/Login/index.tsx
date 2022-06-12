import { Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import initLoginStateAfterLogin from 'src/redux/action/login';
import { getCurrentUser } from 'src/redux/action/user';
import { usePinterestDispatch } from 'src/redux/hooks';
import { login } from 'src/service/auth.service';
import { saveUserInfoIntoStorage } from 'src/util/user';
import { CssTextField } from './Component';
import './Login.scss';

type LoginFormValues = {
  username: string;
  password: string;
};

function Login() {
  const { handleSubmit, register } = useForm<LoginFormValues>();
  const navigate = useNavigate();
  const dispatch = usePinterestDispatch();
  const onSubmit: SubmitHandler<LoginFormValues> = async (loginFormValues) => {
    try {
      const rawData = await login(loginFormValues);
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

  useEffect(() => {
    const userInfo = localStorage.getItem('user_info');
    if (userInfo && userInfo !== 'undefined') {
      navigate('/home', {
        replace: true,
      });
    } else {
      navigate('/login', { replace: true });
    }
  }, []);

  return (
    <Grid container className="login">
      <Grid container className="login-content">
        <Grid item className="login__paper">
          <form
            className="login__form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography
              variant="h4"
              sx={{ marginBottom: 3, textAlign: 'center' }}
              gutterBottom
            >
              Login
            </Typography>
            <CssTextField
              {...register('username')}
              sx={{ marginBottom: 1.25, marginTop: 1.25 }}
              placeholder="Email"
            />
            <CssTextField
              {...register('password')}
              type="password"
              placeholder="Password"
            />
            <Link className="forgot-password-link" to="/forgot-password">
              <p>Forgot password?</p>
            </Link>
            <Button
              title="Login"
              type="submit"
              variant="contained"
              disableElevation
              color="info"
            >
              Login
            </Button>
            <div className="register-link">
              Don&apos;t have an account?&nbsp;
              <Link to="/register">
                <p>Sign up</p>
              </Link>
            </div>
          </form>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Login;
