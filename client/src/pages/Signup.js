import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { useNavigate } from 'react-router-dom';
import authApi from './../api/authApi';

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userNameErr, setUserNameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [confirmPasswordErr, setConfirmPasswordErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    setUserNameErr('');
    setPasswordErr('');
    setConfirmPasswordErr('');

    const data = new FormData(e.target);
    const userName = data.get('userName').trim();
    const password = data.get('password').trim();
    const confirmPassword = data.get('confirmPassword').trim();

    let err = false;

    if (userName === '') {
      err = true;
      setUserNameErr('Please enter a user name');
    }
    if (password === '') {
      err = true;
      setPasswordErr('Please enter a password');
    }
    if (confirmPassword === '') {
      err = true;
      setConfirmPasswordErr('Please enter a confirm password');
    }
    if (password !== confirmPassword) {
      err = true;
      setConfirmPasswordErr('Confirm password not match ');
    }

    if (err) return;

    setLoading(true);
    try {
      const res = await authApi.signup({
        userName,
        password,
        confirmPassword,
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
        if (e.param === 'confirmPassword') {
          setConfirmPasswordErr(e.msg);
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
        <TextField
          margin='normal'
          required
          fullWidth
          id='confirmPassword'
          label='Confirm Password'
          name='confirmPassword'
          type='password'
          disabled={loading}
          error={confirmPasswordErr !== ''}
          helperText={confirmPasswordErr}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          variant='outlined'
          fullWidth
          color='primary'
          type='submit'
          loading={loading}
        >
          Signup
        </LoadingButton>
      </Box>
      <Button component={Link} to='/login' sx={{ textTransform: 'none' }}>
        Have an account? Login now
      </Button>
    </>
  );
};
export default Signup;
