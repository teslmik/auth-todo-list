/* eslint-disable import/no-extraneous-dependencies */
import { Button } from '@mui/material';
import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { IAllTodosData } from '../../../types';
import { TodoItem } from '../todo-item.component';
import { StyledTodoCard } from './todo-cerd.styled';

interface Props {
  data: InfiniteData<IAllTodosData>;
  handleOpen: (id: string) => void;
  fetchNextPage: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<IAllTodosData, AxiosResponse<any>>>;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

export const TodoCards: React.FC<Props> = ({
  data,
  handleOpen,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage
}) => {
  const { ref, inView } = useInView();

  const handleFetchNeaxtPage = () => fetchNextPage();

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <StyledTodoCard>
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.data.map((todo) => (
            <TodoItem key={todo.id} todo={todo} handleOpen={handleOpen} />
          ))}
        </React.Fragment>
      ))}
      <Button
        ref={ref}
        disabled={!hasNextPage || isFetchingNextPage}
        onClick={handleFetchNeaxtPage}
      >
        {isFetchingNextPage
          ? 'Loading more...'
          : hasNextPage
          ? 'Load Newer'
          : 'Nothing more to load'}
      </Button>
    </StyledTodoCard>
  );
};
