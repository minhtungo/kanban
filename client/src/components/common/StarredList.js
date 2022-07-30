import { Box, Typography, ListItem, ListItemButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import boardApi from './../../api/boardApi';
import { setStarredList } from '../../redux/features/starredSlice';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const StarredList = () => {
  const dispatch = useDispatch();

  const list = useSelector((state) => state.stars.value);
  const [activeIndex, setActiveIndex] = useState(0);
  const { boardId } = useParams();

  useEffect(() => {
    const getBoards = async () => {
      try {
        const res = await boardApi.getStars();
        dispatch(setStarredList(res));
      } catch (error) {
        alert(error);
      }
    };
    getBoards();
  }, []);

  useEffect(() => {
    const index = list.findIndex((e) => e.id === boardId);
    setActiveIndex(index);
  }, [list, boardId]);

    const onDragEnd = async ({ source, destination }) => {
      const newList = [...list];
      const [removed] = newList.splice(source.index, 1);
      newList.splice(destination.index, 0, removed);

      const activeItem = newList.findIndex((e) => e.id === boardId);
      setActiveIndex(activeItem);
      dispatch(setStarredList(newList));

      try {
        await boardApi.updateStarredPosition({ boards: newList });
      } catch (error) {}
    };

  return (
    <>
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
            Starred
          </Typography>
        </Box>
      </ListItem>{' '}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          key={'list-board-droppable'}
          droppableId={'list-board-droppable'}
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {list.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <ListItemButton
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      selected={index === activeIndex}
                      component={Link}
                      to={`/boards/${item.id}`}
                      sx={{
                        pl: '20px',
                        cursor: snapshot.isDragging
                          ? 'grab'
                          : 'pointer!important',
                      }}
                    >
                      <Typography
                        variant='body2'
                        fontWeight='700'
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.icon} {item.title}
                      </Typography>
                    </ListItemButton>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
export default StarredList;
