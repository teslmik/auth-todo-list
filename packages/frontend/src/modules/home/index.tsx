import React from 'react';
import { TodoButtonGroup } from '../common/components/button-group';
import { TodoSearch } from '../common/components/search';
import { TodoList } from '../common/components/todo-list';
import { ButtonType } from '../common/enums';
import { StyledBoxMain } from './home.styled';

const HomePageContainer: React.FC = () => {
  const [buttonLabel, setButtonLabel] = React.useState(ButtonType.ALL);
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
