import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import boardApi from '../api/boardApi';
import { Box, IconButton, TextField } from '@mui/material';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

import { useDispatch, useSelector } from 'react-redux';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EmojiPicker from '../components/common/EmojiPicker';
import { setBoards } from '../redux/features/boardSlice';
import { setStarredList } from '../redux/features/starredSlice';
import Kanban from './../components/common/Kanban';

let timer;
const timeout = 500;

const Board = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { boardId } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([]);
  const [isStarred, setIsStarred] = useState('');
  const [icon, setIcon] = useState('');

  const boards = useSelector((state) => state.board.value);
  const starredList = useSelector((state) => state.stars.value);

  useEffect(() => {
    const getBoard = async () => {
      try {
        const res = await boardApi.getOne(boardId);
        setTitle(res.title);
        setDescription(res.description);
        setSections(res.sections);
        setIsStarred(res.starred);
        setIcon(res.icon);
      } catch (error) {
        alert(error);
      }
    };
    getBoard();
  }, [boardId]);

  const onIconChange = async (newIcon) => {
    let temp = [...boards];
    const index = temp.findIndex((e) => e.id === boardId);
    temp[index] = { ...temp[index], icon: newIcon };
    if (isStarred) {
      let tempStar = [...boards];
      const starredIndex = tempStar.findIndex((e) => e.id === boardId);
      tempStar[index] = { ...tempStar[starredIndex], icon: newIcon };
      dispatch(setStarredList(tempStar));
    }
    setIcon(newIcon);
    dispatch(setBoards(temp));
    try {
      await boardApi.update(boardId, { icon: newIcon });
    } catch (error) {
      alert(error);
    }
  };

  const updateTitle = async (e) => {
    clearTimeout(timer);
    const newTitle = e.target.value;
    setTitle(newTitle);

    let temp = [...boards];
    const index = temp.findIndex((e) => e.id === boardId);
    temp[index] = { ...temp[index], title: newTitle };

    if (isStarred) {
      let tempStar = [...boards];
      const starredIndex = tempStar.findIndex((e) => e.id === boardId);
      tempStar[index] = { ...tempStar[starredIndex], title: newTitle };
      dispatch(setStarredList(tempStar));
    }

    dispatch(setBoards(temp));
    timer = setTimeout(async () => {
      try {
        await boardApi.update(boardId, { title: newTitle });
      } catch (error) {
        alert(error);
      }
    }, timeout);
  };

  const updateDescription = async (e) => {
    clearTimeout(timer);
    const newDescription = e.target.value;
    setDescription(newDescription);

    timer = setTimeout(async () => {
      try {
        await boardApi.update(boardId, { description: newDescription });
      } catch (error) {
        alert(error);
      }
    }, timeout);
  };

  const addStarred = async () => {
    try {
      const board = await boardApi.update(boardId, { starred: !isStarred });
      let newStarredList = [...starredList];
      if (isStarred) {
        newStarredList = newStarredList.filter((e) => e.id !== boardId);
      } else {
        newStarredList.unshift(board);
      }
      dispatch(setStarredList(newStarredList));
      setIsStarred(!isStarred);
    } catch (error) {
      alert(error);
    }
  };

  const deleteBoard = async () => {
    try {
      await boardApi.delete(boardId);
      if (isStarred) {
        const newStarredList = starredList.filter((e) => e.id !== boardId);
        dispatch(setStarredList(newStarredList));
      }
      const newList = boards.filter((e) => e.id !== boardId);
      if (newList.length === 0) {
        navigate('/boards');
      } else {
        navigate(`/boards/${newList[0].id}`);
      }
      dispatch(setBoards(newList));
    } catch (error) {
      alert(error);
    }
  };

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
        <IconButton variant='outlined' onClick={addStarred}>
          {isStarred ? (
            <StarOutlinedIcon color='warning' />
          ) : (
            <StarBorderOutlinedIcon />
          )}
        </IconButton>
        <IconButton variant='outlined' color='error' onClick={deleteBoard}>
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: '10px 50px' }}>
        <Box>
          <EmojiPicker icon={icon} onChange={onIconChange} />
          <TextField
            value={title}
            onChange={updateTitle}
            placeholder='Untitled'
            variant='outlined'
            fullWidth
            sx={{
              '& .MuiOutlinedInput-input': { padding: 0 },
              '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
              '& .MuiOutlinedInput-root': {
                fontSize: '2rem',
                fontWeight: '700',
              },
            }}
          />
          <TextField
            value={description}
            onChange={updateDescription}
            placeholder='Add a description here'
            variant='outlined'
            fullWidth
            sx={{
              '& .MuiOutlinedInput-input': { padding: 0 },
              '& .MuiOutlinedInput-notchedOutline': { border: 'unset' },
              '& .MuiOutlinedInput-root': { fontSize: '0.8rem' },
            }}
          />
        </Box>

        <Box>
          <Kanban data={sections} boardId={boardId} />
        </Box>
      </Box>
    </>
  );
};
export default Board;
