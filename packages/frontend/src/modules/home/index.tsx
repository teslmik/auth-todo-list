import { Alert } from '@mui/material';
import React from 'react';
import { TodoButtonGroup } from '../common/components/button-group';
import { Loader } from '../common/components/loader';
import { TodoSearch } from '../common/components/search';
import { TodoList } from '../common/components/todo-list';
import { ButtonType } from '../common/enums';
import { useGetUser } from '../common/hooks';
import { StyledBoxMain } from './home.styled';

const HomePageContainer: React.FC = () => {
  const { data, isLoading, isSuccess } = useGetUser();

  const [buttonLabel, setButtonLabel] = React.useState(ButtonType.ALL);
  const [search, setSearch] = React.useState('');

  if (isLoading || !isSuccess) {
    return <Loader />;
  }

  return (
    <>
      <StyledBoxMain component="div" sx={{ display: 'flex' }}>
        <TodoButtonGroup buttonLabel={buttonLabel} setButtonLabel={setButtonLabel} />
        <TodoSearch search={search} setSearch={setSearch} />
      </StyledBoxMain>
      {isSuccess && data.isActivated ? (
        <TodoList status={buttonLabel} search={search} />
      ) : (
        <Alert
          severity="error"
          sx={{
            disply: 'flex',
            alignItems: 'center',
            position: 'relative',
            top: '50%',
            transform: 'translateY(-100%)'
          }}
        >
          {`The user is not activated, please go to the email ${data?.email} and open the link in the letter to
          activate`}
        </Alert>
      )}
    </>
  );
};

export default HomePageContainer;
