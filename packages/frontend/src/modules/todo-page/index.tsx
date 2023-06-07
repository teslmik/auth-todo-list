import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import React from 'react';
import { useGetOneTodo } from '../common/hooks';
import { Loader } from '../common/components/loader';

const TodoPageContainer: React.FC = () => {
  const { id } = useParams();
  const { data, isLoading, isSuccess } = useGetOneTodo(id as string);

  if (isLoading || !isSuccess) {
    return <Loader />;
  }

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>{`TodoPage ${data.title}`}</Typography>
      <Typography variant="h6" component="p">{`TodoPage ${data.description}`}</Typography>
    </Box>
  );
};

export default TodoPageContainer;
