import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePageContainer from '../home';
import TodoPageContainer from '../todo-page';
import { APP_KEYS } from '../common/consts';
import MainLayout from '../layout';

export const MainRouter: React.FC = () => (
  <Router>
    <Routes>
      <Route path={APP_KEYS.ROUTER_KEYS.ROOT} element={<MainLayout />}>
        <Route path={APP_KEYS.ROUTER_KEYS.NULL} element={<HomePageContainer />} />
        <Route path={`${APP_KEYS.ROUTER_KEYS.TODOS}/:id`} element={<TodoPageContainer />} />
        <Route
          path={APP_KEYS.ROUTER_KEYS.NOT_FOUND}
          element={
            <div>
              <p>Error 404</p>
              <p>Page Not Found</p>
            </div>
          }
        />
      </Route>
    </Routes>
  </Router>
);
