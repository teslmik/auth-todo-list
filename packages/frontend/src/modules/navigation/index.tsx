import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePageContainer from '../home';
import TodoPageContainer from '../todo-page';
import { APP_KEYS } from '../common/consts';
import MainLayout from '../layout';
import { AuthPage } from '../auth';
import { PrivateRoute, PublicRoute } from '../common/components/private-public-routes';
import { NotFoundPage } from '../not-found-page';

export const MainRouter: React.FC = () => (
  <Router>
    <Routes>
      <Route path={APP_KEYS.ROUTER_KEYS.ROOT} element={<MainLayout />}>
        <Route
          path={APP_KEYS.ROUTER_KEYS.NULL}
          element={
            <PrivateRoute>
              <HomePageContainer />
            </PrivateRoute>
          }
        />
        <Route
          path={APP_KEYS.ROUTER_KEYS.AUTH}
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route
          path={`${APP_KEYS.ROUTER_KEYS.TODOS}/:id`}
          element={
            <PrivateRoute>
              <TodoPageContainer />
            </PrivateRoute>
          }
        />
      </Route>
      <Route path={APP_KEYS.ROUTER_KEYS.NOT_FOUND} element={<NotFoundPage />} />
    </Routes>
  </Router>
);
