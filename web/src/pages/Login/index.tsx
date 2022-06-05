import { Container, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'src/redux/action/user';
import { usePinterestDispatch } from 'src/redux/hooks';
import { login } from 'src/service/auth.service';
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
        localStorage.setItem('token', `Bearer ${data.token}`);
        localStorage.setItem('userId', `${data.userId}`);
        navigate('/home');
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Grid container className="login">
      <Grid container className="login-content">
        <Grid item className="login__paper">
          <form
            className="login__form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid
              container
              direction="column"
              alignItems="center"
              component={Container}
            >
              <Typography variant="h4" gutterBottom>
                Login
              </Typography>
            </Grid>
            <TextField
              {...register('username')}
              sx={{ marginBottom: 1.25 }}
              placeholder="Email or username"
            />

            <TextField
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
              color="primary"
              variant="contained"
              disableElevation
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
