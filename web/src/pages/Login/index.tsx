import { Container } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { AxiosResponse } from 'axios';
import get from 'lodash/get'; //get(obj, path, [defaultValue])
import isEmpty from 'lodash/isEmpty';
import React, { useEffect, useState } from 'react';
import { FormState, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AnyAction } from 'redux';
import Field from 'src/component/Field';
import authService from 'src/service/auth.service'; //Các mothod liên quan đến gọi api ở backend
import userServices from 'src/util/user'; //
import { getMess } from '../../util/message'; //Liên quan đến các messenger thông báo
// import './Login.scss';

interface LoginResponse extends AxiosResponse {
  token?: string;
}

interface LoginFormState extends FormState<any> {
  email?: string;
}

function Login(props: any) {
  const { handleSubmit } = useForm();
  const history = get(props, 'history', {});
  const stateHistory = history.location.state || {};

  const [apiError, setApiError] = useState(
    stateHistory.expired ? getMess('M15') : ''
  );

  //Tương tự componentDidMount
  useEffect(() => {
    const userInfo = userServices.getUserInfo();
    const unLogin = isEmpty(userInfo);
    if (!unLogin) {
      if (userInfo.status === 'defer') return history.push('/verify');
      return history.push('/');
    }
  }, []);

  const onSubmit = (formState: LoginFormState) => {
    setApiError('');

    authService
      .login(formState)
      .then((res: LoginResponse) => {
        userServices.saveUserInfoIntoStorage({
          accessToken: res.token,
        });
        console.log('StateHistory: ', stateHistory.prePath);
        return history.push(stateHistory.prePath || '/home');
      })
      .catch(
        (err: {
          code: number;
          message: React.SetStateAction<string | AnyAction>;
        }) => {
          const requiredNewPassCode = 401;

          if (err.code === requiredNewPassCode) {
            return history.push(`/change-password/${formState.email}`);
          }

          return setApiError(err.message);
        }
      );
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
            <p className="error-text">{apiError}</p>
            <Field />

            <Field />
            <Link className="forgot-password-link" to="/forgotpassword">
              <p>Forgot password?</p>
            </Link>
            <Button />
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
