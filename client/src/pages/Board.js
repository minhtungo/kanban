import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import boardApi from '../api/boardApi';
import { Box } from '@mui/material';

const Board = () => {
  const { boardId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([]);
  const [isFavorite, setIsFavorite] = useState('');
  const [icon, setIcon] = useState('');

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await boardApi.getOne(boardId);
        setTitle(res.title);
        setDescription(res.description);
        setSections(res.sections);
        setIsFavorite(res.favorite);
        setIcon(res.icon);
        console.log(res);
      } catch (error) {
        alert(error);
      }
    };
    getBoard();
  }, [boardId]);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <IconButton variant='outlined'>

        </IconButton>
      </Box>
    </>
  );
};
export default Board;
