import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from 'styled-components';

import { MainRouter } from '../navigation';
import * as theme from '../theme';
import * as Styled from './app.styled';
import '../../style.css';
import { MyGlobalContext } from '../common/hooks';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnMount: 'always',
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      cacheTime: Infinity
    }
  }
});

const AppContainer: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState<{ open: boolean; edit?: boolean }>({
    open: false,
    edit: undefined
  });
  return (
    <ThemeProvider theme={theme}>
      <Styled.GlobalStyles />
      <QueryClientProvider client={queryClient}>
        <MyGlobalContext.Provider value={React.useMemo(() => ({ isOpen, setIsOpen }), [isOpen])}>
          <MainRouter />
          <ReactQueryDevtools initialIsOpen={false} />
        </MyGlobalContext.Provider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default AppContainer;
