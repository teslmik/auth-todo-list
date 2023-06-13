import { Box } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import { TodoButtonGroup } from '../common/components/button-group';
import { TodoSearch } from '../common/components/search';
import { TodoList } from '../common/components/todo-list';
import { ButtonType } from '../common/types';

const StyledBoxMain = styled(Box)`
  margin-top: ${({ theme }) => theme.SPACES.xl};
  gap: 32px;

  @media ${({ theme }) => theme.BREAKPOINTS.tablet} {
    flex-direction: column-reverse;
    align-items: center;
    gap: 12px;
  }

  @media ${({ theme }) => theme.BREAKPOINTS.mobile} {
    flex-direction: column-reverse;
    align-items: center;
    gap: 12px;
  }
`;

const HomePageContainer: React.FC = () => {
  const [buttonLabel, setButtonLabel] = React.useState<ButtonType>('all');
  const [search, setSearch] = React.useState('');

  return (
    <>
      <StyledBoxMain component="div" sx={{ display: 'flex' }}>
        <TodoButtonGroup buttonLabel={buttonLabel} setButtonLabel={setButtonLabel} />
        <TodoSearch search={search} setSearch={setSearch} />
      </StyledBoxMain>
      <TodoList status={buttonLabel} search={search} />
    </>
  );
};

export default HomePageContainer;
