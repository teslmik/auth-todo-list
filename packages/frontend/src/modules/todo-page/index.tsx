import { Box, Button, Switch, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import { useEditTodo, useGetOneTodo } from '../common/hooks';
import { Loader } from '../common/components/loader';

const TodoPageContainer: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isSuccess } = useGetOneTodo(id as string);
  const { mutate: editTodo, isLoading: updPending } = useEditTodo();

  const handleOnClick = () => navigate('/');
  if (isLoading || !isSuccess) {
    return <Loader />;
  }

  const handleEditTodo = () =>
    editTodo({
      id: data.id,
      title: data.title,
      description: data.description,
      complited: !data.complited
    });

  return (
    <Box sx={{ height: '100%', mt: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        {data.title}
      </Typography>
      <Typography variant="subtitle1" component="p">
        Description:
      </Typography>
      <Typography variant="h6" component="p" sx={{ flex: '1 1 auto' }}>
        {data.description}
      </Typography>
      <Box sx={{ width: 288, display: 'flex', justifyContent: 'space-between', mb: 4, mt: 4 }}>
        <Typography variant="h6" component="p">
          Complete:
        </Typography>
        <Switch checked={data.complited} disabled={updPending} onChange={handleEditTodo} />
      </Box>
      <Box sx={{ width: 288, display: 'flex', justifyContent: 'space-between', mb: 4, mt: 4 }}>
        <Typography variant="h6" component="p">
          Private:
        </Typography>
        <Switch />
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
