import {
  Drawer,
  List,
  Box,
  Typography,
  IconButton,
  ListItem,
} from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import assets from './../../assets/index';

const Sidebar = () => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  const sidebarWidth = 250;

  const logout = () => {
    console.log('heloo');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Drawer
      container={window.document.body}
      variant='permanent'
      open={true}
      sx={{
        width: sidebarWidth,
        height: '100%',
        '& > div': { borderRight: 'none' },
      }}
    >
      <List
        disablePadding
        sx={{
          width: sidebarWidth,
          height: '100vh',
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItem>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='body2' fontWeight='700'>
              {user.userName}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlinedIcon fontSize='small' />
            </IconButton>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: '10px' }} />
        <ListItem>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='body2' fontWeight='700'>
              Favourites
            </Typography>
          </Box>
        </ListItem>
        <Box sx={{ paddingTop: '10px' }} />
        <ListItem>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='body2' fontWeight='700'>
              Private
            </Typography>
            <IconButton onClick={logout}>
              <AddBoxOutlinedIcon fontSize='small' />
            </IconButton>
          </Box>
        </ListItem>
      </List>
    </Drawer>
  );
};
export default Sidebar;
