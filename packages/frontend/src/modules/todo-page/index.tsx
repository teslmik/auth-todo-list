import { Box, Button, Switch, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import { useEditTodo, useGetOneTodo } from '../common/hooks';
import { Loader } from '../common/components/loader';
import { APP_KEYS } from '../common/consts';

const TodoPageContainer: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isSuccess, isError } = useGetOneTodo(id as string);
  const { mutate: editTodo, isLoading: updPending } = useEditTodo();

  const handleOnClick = () => navigate(APP_KEYS.ROUTER_KEYS.ROOT);

  if (isLoading) {
    return <Loader />;
  }

  const restData = {
    id: data?.id as string,
    title: data?.title as string,
    description: data?.description as string
  };

  const handleToggleComplete = () => {
    editTodo({
      ...restData,
      completed: !data?.completed,
      private: data?.private as boolean
    });
  };

  const handleTogglePrivate = () => {
    editTodo({
      ...restData,
      completed: data?.completed as boolean,
      private: !data?.private
    });
  };

  if (isError) {
    navigate(APP_KEYS.ROUTER_KEYS.ROOT);
  }

  return (
    <Box sx={{ height: '100%', mt: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        {isSuccess && data.title}
      </Typography>
      <Typography variant="subtitle1" component="p">
        Description:
      </Typography>
      <Typography variant="h6" component="p" sx={{ flex: '1 1 auto' }}>
        {isSuccess && data.description}
      </Typography>
      <Box sx={{ width: 288, display: 'flex', justifyContent: 'space-between', mb: 4, mt: 4 }}>
        <Typography variant="h6" component="p">
          Complete:
        </Typography>
        <Switch
          checked={isSuccess && data.completed}
          disabled={updPending}
          onChange={handleToggleComplete}
        />
      </Box>
      <Box sx={{ width: 288, display: 'flex', justifyContent: 'space-between', mb: 4, mt: 4 }}>
        <Typography variant="h6" component="p">
          Private:
        </Typography>
        <Switch
          checked={isSuccess && data.private}
          disabled={updPending}
          onChange={handleTogglePrivate}
        />
      </Box>
      <Box>
        <Button variant="contained" sx={{ width: 288, mb: 5, mt: 4 }} onClick={handleOnClick}>
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default TodoPageContainer;
