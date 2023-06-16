import React from 'react';
import { TodoButtonGroup } from '../common/components/button-group';
import { Loader } from '../common/components/loader';
import { TodoSearch } from '../common/components/search';
import { TodoList } from '../common/components/todo-list';
import { ButtonType } from '../common/enums';
import { useGetUser } from '../common/hooks';
import { StyledAlertMain, StyledBoxMain } from './home.styled';

const HomePageContainer: React.FC = () => {
  const { data, isLoading, isSuccess } = useGetUser();

  const [buttonLabel, setButtonLabel] = React.useState(ButtonType.ALL);
  const [isUserLoaded, setIsUserLoaded] = React.useState(false);
  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    if (data) {
      setIsUserLoaded(true);
    }
  }, [data]);

  if (isLoading || !isSuccess || !isUserLoaded) {
    return <Loader />;
  }

  return (
    <>
      <StyledBoxMain component="div">
        <TodoButtonGroup buttonLabel={buttonLabel} setButtonLabel={setButtonLabel} />
        <TodoSearch search={search} setSearch={setSearch} />
      </StyledBoxMain>
      {isUserLoaded && data.isActivated && <TodoList status={buttonLabel} search={search} />}
      {isUserLoaded && !data.isActivated && (
        <StyledAlertMain severity="error">
          {`The user is not activated, please go to the email ${data?.email} and open the link in the letter to
          activate`}
        </StyledAlertMain>
      )}
    </>
  );
};

export default HomePageContainer;
