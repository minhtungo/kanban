import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

const Home = () => {
  const createBoard = () => {};

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LoadingButton variant='outlined' onClick={createBoard}>
        Create Your First Board
      </LoadingButton>
    </Box>
  );
};
export default Home;
