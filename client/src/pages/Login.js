import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import authApi from '../api/authApi';

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userNameErr, setUserNameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUserNameErr('');
    setPasswordErr('');

    const data = new FormData(e.target);
    const userName = data.get('userName').trim();
    const password = data.get('password').trim();

    let err = false;

    if (userName === '') {
      err = true;
      setUserNameErr('Please enter a user name');
    }
    if (password === '') {
      err = true;
      setPasswordErr('Please enter a password');
    }

    if (err) return;

    setLoading(true);

    try {
      const res = await authApi.login({
        userName,
        password,
      });
      setLoading(false);
      localStorage.setItem('token', res.token);
      navigate('/');
    } catch (error) {
      const errors = error.data.errors;
      errors.forEach((e) => {
        if (e.param === 'userName') {
          setUserNameErr(e.msg);
        }
        if (e.param === 'password') {
          setPasswordErr(e.msg);
        }
      });
      setLoading(false);
    }
  };

  return (
    <>
      <Box component='form' sx={{ mt: 1 }} onSubmit={handleSubmit} noValidate>
        <TextField
          margin='normal'
          required
          fullWidth
          id='userName'
          label='Username'
          name='userName'
          disabled={loading}
          error={userNameErr !== ''}
          helperText={userNameErr}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='password'
          label='Password'
          name='password'
          type='password'
          disabled={loading}
          error={passwordErr !== ''}
          helperText={passwordErr}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant='outlined'
          fullWidth
          color='primary'
          type='submit'
          loading={loading}
        >
          Login
        </LoadingButton>
      </Box>
      <Button component={Link} to='/signup' sx={{ textTransform: 'none' }}>
        Do not have an account? Signup now
      </Button>
    </>
  );
};
export default Login;
