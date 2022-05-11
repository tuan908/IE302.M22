import { Container, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';
import auth from 'src/service/auth.service';
import { getCurrentUser } from 'src/redux/action/user';
import { usePinterestDispatch } from 'src/redux/hooks';

// interface LoginResponse extends AxiosResponse {
//   token?: string;
// }

// interface LoginFormState extends FormState<any> {
//   email?: string;
// }
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
      const rawData = await auth.login(loginFormValues);
      const { data } = rawData;
      if (data) {
        console.log(getCurrentUser(data));
        dispatch(getCurrentUser(data));
        navigate('/');
      }
    } catch (error) {}
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
              {/* <img src={logo} className="logo" alt=""></img> */}
              <Typography variant="h5" gutterBottom>
                Welcome Back!
              </Typography>
              <Typography variant="body2" gutterBottom>
                ""
              </Typography>
            </Grid>
            <TextField helperText={''} label={''} {...register('username')} />

            <TextField helperText={''} label={''} {...register('password')} />
            <Link className="forgot-password-link" to="/forgotpassword">
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
