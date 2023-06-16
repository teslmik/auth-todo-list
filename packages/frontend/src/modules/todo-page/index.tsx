import { Box, Button, Switch, Typography } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import React from 'react';
import { useEditTodo, useGetOneTodo } from '../common/hooks';
import { Loader } from '../common/components/loader';
import { APP_KEYS } from '../common/consts';
import { IUser } from '../common/types';
import { StyledTodoPage } from './todo-page.styled';

const TodoPageContainer: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, isSuccess, isError } = useGetOneTodo(id as string);
  const { mutate: editTodo, isLoading: updPending } = useEditTodo();

  const client = useQueryClient();
  const authUser: IUser | undefined = client.getQueryData([APP_KEYS.QUERY_KEYS.USER]);

  const handleOnClick = () => navigate(APP_KEYS.ROUTER_KEYS.ROOT);

  if (isLoading) {
    return <Loader />;
  }

  const isDisabled = data?.userId === authUser?.id;

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
    <StyledTodoPage>
      <Typography variant="h3">{isSuccess && data.title}</Typography>
      <Typography variant="subtitle1" component="p">
        Description:
      </Typography>
      <Typography className="box-description" variant="h6" component="p">
        {isSuccess && data.description}
      </Typography>
      <Box className="box-completed">
        <Typography variant="h6" component="p">
          Complete:
        </Typography>
        <Switch
          checked={isSuccess && data.completed}
          disabled={updPending}
          onChange={handleToggleComplete}
        />
      </Box>
      <Box className="box-actions">
        <Typography variant="h6" component="p">
          Private:
        </Typography>
        <Switch
          checked={isSuccess && data.private}
          disabled={updPending || !isDisabled}
          onChange={handleTogglePrivate}
        />
      </Box>
      <Box>
        <Button className="box-button" variant="contained" onClick={handleOnClick}>
          Back
        </Button>
      </Box>
    </StyledTodoPage>
  );
};

export default TodoPageContainer;
