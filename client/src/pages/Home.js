import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import boardApi from './../api/boardApi';
import { setBoards } from '../redux/features/boardSlice';

import { useState } from 'react';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const createBoard = async () => {
    try {
      const res = await boardApi.create();
      dispatch(setBoards([res]));
      navigate(`/boards/${res.id}`);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingButton variant='outlined' onClick={createBoard} loading={loading}>
        Create Your First Board
      </LoadingButton>
    </Box>
  );
};
export default Home;
